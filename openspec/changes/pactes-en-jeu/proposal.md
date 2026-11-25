# Proposal

## Why

Les cinq pactes (Hordes, Acier, Fureur, Hâte, Disette) ne sont accessibles qu'après une première victoire, ce qui laisse les experts sans défi avant d'avoir gagné une fois. Le risque doit être un choix vécu en jeu, pas un réglage de menu.

## What Changes

- Avant chaque gardien (étages 3, 6, 9, 12), le jeu **propose un pacte** en échange d'une récompense supplémentaire (par exemple une relique légendaire en plus). Le refuser est le choix par défaut.
- Le pacte accepté s'applique jusqu'à la fin de la partie ou jusqu'au gardien suivant (durée à trancher dans `design.md`).
- La récompense tient compte de la note d'étage de `note-par-etage`.
- Les pactes existants gardent leurs effets ; leur déblocage après une victoire est remplacé par cette offre dès la première partie.
- Le record continue de classer le nombre de pactes d'une victoire.
- En duo, l'offre est commune : les deux héros subissent le pacte, la récompense est partagée.

Hors périmètre : nouveaux pactes, paliers de difficulté, réglage « Récit ».

## Capabilities

### New Capabilities
- `pactes-en-partie`: offre de pacte avant un gardien, application, durée et récompense associée.

### Modified Capabilities

## Impact

- `index.html` : `PACTS`, flux avant gardien (overlay ou rencontre), `rollPerks` ou table de reliques, écran d'accueil (suppression du déblocage par victoire), record.
- `localStorage` : clé `profondeurs.pactes` à migrer ou à garder compatible.
- `CHANGELOG.md`, `README.md` (section Pactes et grimoire), `GAME_VERSION`.
- Dépend de `note-par-etage`.
