# Relais de signalisation

Petit serveur WebSocket qui met en relation l'hôte d'une partie en ligne et ses amis. Il ne transmet que l'offre, la réponse et les candidats de connexion WebRTC ; la partie passe ensuite en direct entre les navigateurs. Aucun état n'est conservé : les salons vivent en mémoire.

## Protocole (JSON sur `/ws`)

| Sens | Message | Réponse |
| --- | --- | --- |
| client → relais | `{t:'host', proto}` | `{t:'room', code, id:0}` |
| client → relais | `{t:'join', code, proto}` | `{t:'joined', id, code}` ; l'hôte reçoit `{t:'peer', id}` |
| client → relais | `{t:'sig', to, data}` | le destinataire reçoit `{t:'sig', from, data}` |
| relais → client | `{t:'gone', id}` | un ami est parti (envoyé à l'hôte) |
| relais → client | `{t:'closed', why}` | le salon est fermé (hôte parti ou inactivité) |
| relais → client | `{t:'err', why}` | `unknown`, `full`, `busy` ou `version` |

Le code a 4 caractères parmi `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. Un ami ne parle qu'à l'hôte (id 0). Un salon compte 4 membres au plus, hôte compris.

## Limites

Messages de 16 Ko, débit limité par connexion, connexions limitées par IP, salons fermés après 15 minutes sans échange. Les origines des pages sont vérifiées.

| Variable | Défaut |
| --- | --- |
| `PORT`, `HOST` | `8080`, `0.0.0.0` |
| `ALLOWED_ORIGINS` | `https://k1n0b0n.github.io,http://localhost:8000,null` |
| `MAX_ROOMS`, `MAX_PER_IP`, `ROOM_IDLE_MS` | `200`, `6`, `900000` |
| `TRUST_PROXY` | `1` derrière un reverse proxy, pour lire l'IP dans `X-Forwarded-For` |

## Lancer et tester

```
npm install && npm test
PORT=8091 HOST=127.0.0.1 ALLOWED_ORIGINS=http://localhost:8000 node server.mjs
```

Pour tester le jeu contre ce relais, ouvrir la page sur `localhost` avec `?relais=ws://127.0.0.1:8091/ws` (ce paramètre n'est lu que sur `localhost` et `127.0.0.1`).

## Déploiement

`docker compose up -d --build` : conteneur sans droits root, système de fichiers en lecture seule, toutes capacités retirées, 64 Mo, port publié sur la boucle locale seulement (`RELAY_PORT`, 8090 par défaut). Un reverse proxy TLS se place devant (`nginx.conf.example`) : Docker contourne un pare-feu hôte, donc le port ne doit jamais être publié directement.

## Vie privée

Le relais voit les codes de salon, les offres et réponses WebRTC (donc les adresses réseau des joueurs) le temps de la mise en relation. Il ne journalise ni adresse ni code et ne conserve rien.
