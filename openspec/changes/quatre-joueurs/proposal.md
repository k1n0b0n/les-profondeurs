# Proposal

## Why

Le jeu local s'arrête à deux joueurs. Avec quatre classes de héros et l'objectif d'un jeu en ligne (jusqu'à quatre joueurs, certains à distance), le moteur doit gérer jusqu'à quatre héros simultanés.

## What Changes

- Le salon permet de réunir **deux à quatre joueurs** : moitié gauche et moitié droite du clavier, et autant de manettes que branchées. Le jeu démarre dès que deux joueurs au moins sont prêts.
- Quatre couleurs de joueur (bleu, rouge, vert, or), quatre fiches de héros (J1 et J2 en haut, J3 et J4 en bas de l'écran), quatre balises « à terre », une torche par héros.
- La laisse, la caméra et la relève fonctionnent pour N héros : la laisse tire chaque héros trop éloigné, la caméra cadre tous les héros debout, la relève se fait par n'importe quel allié debout.
- Les monstres et gardiens gagnent en PV avec le nombre de joueurs : +30 % de PV par joueur supplémentaire (+60 % pour un gardien de biome), ce qui reste identique à l'actuel pour deux joueurs.
- La cordée se calcule par héros : elle est active tant qu'au moins un allié debout se trouve à moins de quatre unités.
- Le coup double, les notes d'étage, le directeur de rythme et les pactes fonctionnent avec N héros (la note d'équipe est la moyenne, le directeur suit le héros le moins bien noté).

Hors périmètre : jeu en ligne (changement `multi-en-ligne`), mode à quatre sur écran tactile, équilibrage fin des parties à trois ou quatre.

## Capabilities

### New Capabilities
- `jeu-a-plusieurs`: parties locales de deux à quatre joueurs (salon, affichage, laisse, caméra, relève, échelle des monstres).

### Modified Capabilities

## Impact

- `index.html` : `heroTwo` remplacé par une liste de héros supplémentaires, `setupHeroes`, lumières de torche, `P_COLOR`, tableaux de suivi du HUD, fiches et balises (HTML, CSS), salon (`lobby`), `enforceLeash`, `updateCamera`, `updateCordee`, échelle des monstres, minicarte.
- `README.md`, `CHANGELOG.md`, `GAME_VERSION`.
