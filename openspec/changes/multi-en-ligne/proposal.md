# Proposal

## Why

Le jeu se joue à plusieurs sur un même écran, mais pas à distance. L'objectif est de jouer à deux, trois ou quatre avec des amis qui ne sont pas dans la même pièce, sans serveur de jeu à héberger : le site reste statique (GitHub Pages) et le moteur reste un seul fichier.

## What Changes

- Un joueur **héberge** la partie : le jeu tourne chez lui, comme en local. Les amis **rejoignent par un lien** et voient l'écran de l'hôte en direct (flux vidéo WebRTC) pendant que leurs commandes (clavier ou manette) lui sont envoyées.
- Chaque ami apparaît dans le salon de l'hôte comme une **manette virtuelle** : il rejoint, choisit sa classe, joue, navigue dans les menus (aptitudes, autel, marchand) exactement comme un joueur local.
- Aucune inscription ni serveur de jeu : l'**invitation** est un lien généré par l'hôte, et la **réponse** de l'ami est un code que l'ami lui renvoie (par message). Seul un serveur STUN public sert à traverser les box.
- Jusqu'à quatre joueurs au total (hôte compris), mélangeant joueurs locaux et distants.
- Un écran « Rejoindre » côté ami, avec une vue plein écran, l'aide des touches, la latence et un bouton Quitter.

Hors périmètre : synchronisation d'état et rendu côté client (version 2, voir design), serveur de salons, reconnexion automatique, chat, audio vocal.

## Capabilities

### New Capabilities
- `jeu-en-ligne`: hébergement, invitation, flux vidéo, commandes distantes et salon en ligne.

### Modified Capabilities

## Impact

- `index.html` : `readPads` (manettes virtuelles), module réseau (WebRTC, invitation, codes), écran « Jouer en ligne » du salon, écran « Rejoindre », mode client (flux vidéo et capture des commandes), démarrage conditionné par le lien, CSS.
- `README.md` (section jeu en ligne, limites), `CHANGELOG.md`, `GAME_VERSION`.
