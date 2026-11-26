import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { WebSocket } from 'ws';
import { createRelay } from './server.mjs';

let relay;
let port;
before(async () => {
  relay = createRelay({ ALLOWED_ORIGINS: 'http://ok.test,null', MAX_PER_IP: '50', ROOM_IDLE_MS: '60000' });
  port = await relay.listen(0, '127.0.0.1');
});
after(() => relay.close());

const open = (origin = 'http://ok.test', at = port) =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${at}/ws`, { origin });
    ws.inbox = [];
    ws.waiters = [];
    ws.on('message', (raw) => {
      const msg = JSON.parse(raw);
      const w = ws.waiters.shift();
      if (w) w(msg);
      else ws.inbox.push(msg);
    });
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
  });
const next = (ws) => (ws.inbox.length ? Promise.resolve(ws.inbox.shift()) : new Promise((resolve) => ws.waiters.push(resolve)));
const tx = (ws, msg) => ws.send(JSON.stringify(msg));

test('l’hôte crée un salon, l’ami le rejoint, les signaux circulent', async () => {
  const host = await open();
  tx(host, { t: 'host' });
  const room = await next(host);
  assert.equal(room.t, 'room');
  assert.match(room.code, /^[A-HJ-NP-Z2-9]{4}$/);
  const friend = await open();
  tx(friend, { t: 'join', code: room.code.toLowerCase() });
  assert.deepEqual(await next(friend), { t: 'joined', id: 1, code: room.code });
  assert.deepEqual(await next(host), { t: 'peer', id: 1 });
  tx(host, { t: 'sig', to: 1, data: { type: 'offer', sdp: 'x' } });
  assert.deepEqual(await next(friend), { t: 'sig', from: 0, data: { type: 'offer', sdp: 'x' } });
  tx(friend, { t: 'sig', to: 0, data: { type: 'answer', sdp: 'y' } });
  assert.deepEqual(await next(host), { t: 'sig', from: 1, data: { type: 'answer', sdp: 'y' } });
  friend.close();
  assert.deepEqual(await next(host), { t: 'gone', id: 1 });
  host.close();
});

test('code inconnu, salon plein, et un ami ne parle qu’à l’hôte', async () => {
  const a = await open();
  tx(a, { t: 'join', code: 'ZZZZ' });
  assert.deepEqual(await next(a), { t: 'err', why: 'unknown' });
  a.close();
  const host = await open();
  tx(host, { t: 'host' });
  const { code } = await next(host);
  const friends = [];
  for (let i = 1; i <= 3; i++) {
    const f = await open('null');
    tx(f, { t: 'join', code });
    assert.equal((await next(f)).id, i);
    friends.push(f);
  }
  const extra = await open();
  tx(extra, { t: 'join', code });
  assert.deepEqual(await next(extra), { t: 'err', why: 'full' });
  tx(friends[0], { t: 'sig', to: 2, data: { type: 'x' } });
  tx(friends[0], { t: 'sig', to: 0, data: { type: 'ping' } });
  const seen = [];
  while (!seen.some((m) => m.t === 'sig')) seen.push(await next(host));
  assert.equal(seen.find((m) => m.t === 'sig').data.type, 'ping');
  assert.equal(friends[1].inbox.length, 0);
  for (const f of [...friends, extra, host]) f.close();
});

test('origine refusée, fermeture du salon avec l’hôte', async () => {
  await assert.rejects(open('http://evil.test'));
  const host = await open();
  tx(host, { t: 'host' });
  const { code } = await next(host);
  const friend = await open();
  tx(friend, { t: 'join', code });
  await next(friend);
  host.close();
  assert.deepEqual(await next(friend), { t: 'closed', why: 'host' });
});

test('limite de connexions par IP', async () => {
  const small = createRelay({ ALLOWED_ORIGINS: 'http://ok.test', MAX_PER_IP: '2' });
  const at = await small.listen(0, '127.0.0.1');
  const held = [await open('http://ok.test', at), await open('http://ok.test', at)];
  await assert.rejects(open('http://ok.test', at));
  for (const ws of held) ws.close();
  await small.close();
});

test('une version de protocole différente est refusée à la jonction', async () => {
  const host = await open();
  tx(host, { t: 'host', proto: 2 });
  const { code } = await next(host);
  const old = await open();
  tx(old, { t: 'join', code, proto: 1 });
  assert.deepEqual(await next(old), { t: 'err', why: 'version' });
  const same = await open();
  tx(same, { t: 'join', code, proto: 2 });
  assert.equal((await next(same)).t, 'joined');
  for (const ws of [old, same, host]) ws.close();
});

test('/health répond, le reste non', async () => {
  assert.equal((await fetch(`http://127.0.0.1:${port}/health`)).status, 200);
  assert.equal((await fetch(`http://127.0.0.1:${port}/`)).status, 404);
});
