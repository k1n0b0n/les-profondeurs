// Relais de signalisation pour le jeu en ligne : il met en relation un hôte et ses amis, puis ne sert plus.
// Les salons vivent en mémoire seulement ; la partie elle-même passe en direct (WebRTC) entre les navigateurs.
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { WebSocketServer } from 'ws';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 4;
const MAX_PEERS = 4;

export function createRelay(env = process.env) {
  const origins = new Set((env.ALLOWED_ORIGINS ?? 'https://k1n0b0n.github.io,http://localhost:8000,null').split(',').map((s) => s.trim()).filter(Boolean));
  const maxRooms = Number(env.MAX_ROOMS ?? 200);
  const maxPerIp = Number(env.MAX_PER_IP ?? 6);
  const idleMs = Number(env.ROOM_IDLE_MS ?? 15 * 60 * 1000);
  const trustProxy = env.TRUST_PROXY === '1';

  const rooms = new Map();
  const perIp = new Map();

  const send = (ws, msg) => {
    if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
  };
  const newCode = () => {
    for (let n = 0; n < 50; n++) {
      let code = '';
      for (let i = 0; i < CODE_LENGTH; i++) code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!rooms.has(code)) return code;
    }
    return null;
  };
  const clientIp = (req) => {
    if (trustProxy) {
      const parts = String(req.headers['x-forwarded-for'] ?? '').split(',');
      const last = parts[parts.length - 1].trim();
      if (last) return last;
    }
    return req.socket.remoteAddress ?? '?';
  };

  const http = createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'content-type': 'text/plain' }).end('ok');
      return;
    }
    res.writeHead(404).end();
  });
  const wss = new WebSocketServer({ noServer: true, maxPayload: 16 * 1024 });

  http.on('upgrade', (req, socket, head) => {
    const reject = (status) => {
      socket.write(`HTTP/1.1 ${status}\r\nConnection: close\r\n\r\n`);
      socket.destroy();
    };
    if (new URL(req.url, 'http://x').pathname !== '/ws') return reject('404 Not Found');
    if (!origins.has(req.headers.origin ?? '')) return reject('403 Forbidden');
    const ip = clientIp(req);
    if ((perIp.get(ip) ?? 0) >= maxPerIp) return reject('429 Too Many Requests');
    wss.handleUpgrade(req, socket, head, (ws) => {
      ws.meta = { ip, code: null, id: null, tokens: 40, refill: Date.now(), alive: true, seen: Date.now() };
      perIp.set(ip, (perIp.get(ip) ?? 0) + 1);
      wss.emit('connection', ws);
    });
  });

  const closeRoom = (code, why) => {
    const room = rooms.get(code);
    if (!room) return;
    rooms.delete(code);
    for (const ws of room.members.values()) {
      send(ws, { t: 'closed', why });
      ws.close(1000);
    }
  };

  wss.on('connection', (ws) => {
    ws.on('pong', () => {
      ws.meta.alive = true;
    });
    ws.on('message', (raw) => {
      const m = ws.meta;
      const now = Date.now();
      m.tokens = Math.min(40, m.tokens + ((now - m.refill) / 1000) * 20);
      m.refill = now;
      if (m.tokens < 1) return ws.close(1008, 'rate');
      m.tokens -= 1;
      let msg;
      try {
        msg = JSON.parse(raw.toString());
      } catch {
        return;
      }
      if (!msg || typeof msg !== 'object') return;
      m.seen = now;
      if (msg.t === 'host') {
        if (m.code) return send(ws, { t: 'err', why: 'busy' });
        if (rooms.size >= maxRooms) return send(ws, { t: 'err', why: 'full' });
        const code = newCode();
        if (!code) return send(ws, { t: 'err', why: 'full' });
        rooms.set(code, { members: new Map([[0, ws]]), seen: now, proto: Number(msg.proto) | 0 });
        m.code = code;
        m.id = 0;
        send(ws, { t: 'room', code, id: 0 });
      } else if (msg.t === 'join') {
        if (m.code) return send(ws, { t: 'err', why: 'busy' });
        const code = String(msg.code ?? '').toUpperCase().trim();
        const room = rooms.get(code);
        if (!room) return send(ws, { t: 'err', why: 'unknown' });
        if ((Number(msg.proto) | 0) !== room.proto) return send(ws, { t: 'err', why: 'version' });
        if (room.members.size >= MAX_PEERS) return send(ws, { t: 'err', why: 'full' });
        let id = 1;
        while (room.members.has(id)) id++;
        room.members.set(id, ws);
        room.seen = now;
        m.code = code;
        m.id = id;
        send(ws, { t: 'joined', id, code });
        send(room.members.get(0), { t: 'peer', id });
      } else if (msg.t === 'sig') {
        const room = rooms.get(m.code);
        if (!room || typeof msg.data !== 'object' || msg.data === null) return;
        const to = Number(msg.to);
        if (m.id !== 0 && to !== 0) return;
        const target = room.members.get(to);
        if (!target || target === ws) return;
        room.seen = now;
        send(target, { t: 'sig', from: m.id, data: msg.data });
      }
    });
    ws.on('close', () => {
      const m = ws.meta;
      perIp.set(m.ip, Math.max(0, (perIp.get(m.ip) ?? 1) - 1));
      if (!perIp.get(m.ip)) perIp.delete(m.ip);
      const room = rooms.get(m.code);
      if (!room) return;
      if (m.id === 0) closeRoom(m.code, 'host');
      else if (room.members.get(m.id) === ws) {
        room.members.delete(m.id);
        send(room.members.get(0), { t: 'gone', id: m.id });
      }
    });
    ws.on('error', () => {});
  });

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const ws of wss.clients) {
      if (!ws.meta.alive) {
        ws.terminate();
        continue;
      }
      ws.meta.alive = false;
      ws.ping();
    }
    for (const [code, room] of rooms) if (now - room.seen > idleMs) closeRoom(code, 'idle');
  }, 30_000);
  sweep.unref();

  return {
    http,
    rooms,
    listen: (port, host) => new Promise((resolve) => http.listen(port, host, () => resolve(http.address().port))),
    close: () => new Promise((resolve) => {
      clearInterval(sweep);
      for (const ws of wss.clients) ws.terminate();
      http.close(() => resolve());
    }),
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const relay = createRelay();
  const port = await relay.listen(Number(process.env.PORT ?? 8080), process.env.HOST ?? '0.0.0.0');
  console.log(`relais prêt sur le port ${port}`);
  for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => relay.close().then(() => process.exit(0)));
}
