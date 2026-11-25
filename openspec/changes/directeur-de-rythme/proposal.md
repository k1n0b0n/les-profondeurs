# Proposal

## Why

Une courbe de difficulté unique ne peut pas convenir à la fois aux néophytes et aux experts. Régler les statistiques des monstres selon le joueur est opaque et rend les records incomparables ; régler le **rythme** (pression des rencontres) l'est beaucoup moins.

## What Changes

- Un **directeur de rythme** règle la pression de chaque étage à sa génération : nombre de monstres, élites, embuscades et potions d'étage.
- Il se base sur la note de l'étage précédent (`note-par-etage`) et sur les héros tombés à ce moment-là, jamais sur les PV ou les dégâts des monstres.
- Un joueur en difficulté (note C, héros à terre) trouve moins de monstres, moins d'élites, moins d'embuscades et plus de potions ; un joueur dominant (notes S et A) en trouve davantage.
- Les étages 1 et 2 (initiation) et les étages de gardien ne sont jamais ajustés.
- En duo, le directeur suit le héros le plus en difficulté.
- Un réglage facultatif **Récit** (accueil et pause) fixe la pression au minimum pour toute la partie, sans toucher aux fenêtres d'esquive et de parade. Une partie jouée en Récit ne compte pas pour le record.
- Les valeurs sont regroupées dans une table de constantes, documentée dans le README.

Hors périmètre : paliers de difficulté en menu, modification des PV et dégâts des monstres, ajustement en cours d'étage, indicateur visible de la pression.

## Capabilities

### New Capabilities
- `directeur-de-rythme`: ajustement de la pression des rencontres à la génération d'un étage, selon la maîtrise observée à l'étage précédent.
- `mode-recit`: réglage d'accessibilité fixant la pression au minimum, hors classement.

### Modified Capabilities

## Impact

- `index.html` : `populate` (total de monstres, embuscades, élites, potion d'étage), événement « héros à terre » et `goDown` (compteur d'étage), `recordBest`, réglages de l'accueil et de la pause, `snapshot` / `newRun`, bilans.
- `README.md` (« Réglages d'équilibrage »), `CHANGELOG.md`, `GAME_VERSION`.
- Dépend de `note-par-etage` (terminé).
