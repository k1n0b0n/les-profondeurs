# Proposal

## Why

Le jeu en ligne actuel (changement `multi-en-ligne`) fait partager l'écran de l'hôte : l'ami regarde une vidéo, avec 100 à 250 ms de latence, un partage d'écran à accepter, une qualité bornée par l'hôte, et aucun mobile. Ce qu'on veut : que **chacun lance le jeu dans son navigateur, avec son propre écran**, et que seules les informations nécessaires circulent entre les joueurs.

## What Changes

- L'hôte reste **autoritaire** : il simule la partie comme aujourd'hui. Chaque ami **exécute le jeu localement** pour le rendu seulement (sa caméra, son HUD, ses sons) et reçoit l'état de l'hôte par un **canal de données WebRTC** à la place du flux vidéo. Plus aucun partage d'écran.
- L'étage est construit **à l'identique chez tous** à partir d'une **graine** transmise par l'hôte : seule la génération (`generateDungeon`, `buildLevel`, `populate`) devient déterministe ; la simulation reste en `Math.random`.
- Pendant la partie, l'hôte envoie des **instantanés (~20 Hz)** des entités dynamiques (héros, ennemis, projectiles, bombes, butin, accessoires) avec des **identifiants stables** ; le client **interpole** et affiche des « marionnettes ». Les **événements ponctuels** (sons, toasts, transitions d'écran : choix, boutique, autel, mort, escalier) sont envoyés et rejoués côté client.
- Les commandes de l'ami continuent de circuler par le canal de commandes existant (manette virtuelle côté hôte) ; l'ami joue avec sa manette ou son clavier.
- La mise en relation passe par un **code de salon** de 4 caractères (ex. `K7QM`) : l'hôte le lit, l'ami le tape dans un écran « Rejoindre » (ou l'ouvre par `?salon=CODE`). Un **relais de signalisation auto-hébergé** (`relay/`, `wss://profondeurs.kobbo.fr/ws`) transmet seulement l'offre, la réponse et les candidats ICE (trickle, plus d'attente de 3 s) ; la connexion WebRTC devient directe et le relais n'est plus utilisé ensuite. Les liens `#join=` et les codes manuels (`packCode`, `unpackCode`, `iceDone`) disparaissent. Le plafond reste de quatre joueurs, hôte compris.
- **Prédiction locale** : le héros de chaque ami est déplacé tout de suite avec ses propres commandes (même grille, mêmes collisions), puis réconcilié en douceur avec la position autoritaire de l'hôte, ou recalé si l'écart dépasse un seuil. La latence ne se sent plus sur son propre héros ; dégâts, ennemis et effets restent ceux de l'hôte.
- **BREAKING** : le **mode vidéo est retiré** (`netShare`, `getDisplayMedia`, `captureStream`, flux WebRTC), sans repli. Un hôte et un ami doivent être à la même version du jeu ; une version différente est refusée avec un message.
- Livraison en **quatre étapes jouables séparément** : (1) étage seedé, (2) canal d'état, héros seuls et prédiction, (3) ennemis, tirs, bombes, butin, accessoires, (4) événements, écrans et HUD. Le travail se fait sur une branche ; le retrait de la vidéo et la publication ont lieu quand les quatre étapes sont complètes.

Hors périmètre : serveur de jeu (le relais ne voit jamais la partie), TURN, reconnexion automatique, anti-triche, chat, prédiction des dégâts, des ennemis et des effets (seul le déplacement du héros de l'ami est prédit), mobile tactile en ligne.

## Capabilities

### New Capabilities
- `etat-replique`: construction d'un étage identique par graine, instantanés d'état de l'hôte, rendu et interpolation côté client, événements et écrans rejoués côté client.

### Modified Capabilities

## Impact

- `index.html` : RNG seedé de génération, identifiants stables des entités, sérialisation d'état (héros, ennemis, projectiles, bombes, butin, accessoires, grille), canal de données d'état fiable, mode client avec marionnettes et interpolation, file d'événements (sons, toasts, `state`), HUD client ; prédiction et réconciliation du héros local de l'ami (numéros de commande, acquittement dans les instantanés), client de signalisation (hôte : salon et pairs ; ami : écran « Rejoindre »), évolution de `netWire`, `netInvite`, `joinStart`, `remoteStart` ; `relay/` (serveur de signalisation Node, Dockerfile, compose, modèle nginx, tests) ; suppression du code du flux vidéo. Le mode local (clavier, manettes, jusqu'à quatre joueurs) ne change pas.
- `README.md` (section jeu en ligne), `CHANGELOG.md`, `GAME_VERSION` (1.14.0).
