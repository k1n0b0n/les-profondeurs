# Proposal

## Why

Les experts n'ont pas de but de maîtrise : le jeu ne mesure ni leur précision ni leur régularité. Il manque aussi un indicateur objectif de niveau du joueur, dont dépendront les pactes en jeu et le directeur de rythme.

## What Changes

- Un **bilan en fin d'étage** attribue une note S, A, B ou C, calculée à partir de signaux déjà suivis par le jeu : combo maximal, esquives et parades parfaites, dégâts subis, temps.
- La note est purement informative : elle ne modifie ni la difficulté ni les récompenses dans ce changement.
- La note est conservée par partie et résumée dans le bilan final ; le record reste classé comme aujourd'hui.
- Le bilan est court et ne bloque pas la descente ; les néophytes peuvent l'ignorer.
- En duo, une note par héros et une note d'équipe.

Hors périmètre : effets de la note sur le jeu (traités par `pactes-en-jeu` et `directeur-de-rythme`), classement en ligne.

## Capabilities

### New Capabilities
- `notation-etage`: calcul et affichage de la note d'étage à partir des signaux de maîtrise, par héros et pour l'équipe.

### Modified Capabilities

## Impact

- `index.html` : suivi des signaux (combo, esquives parfaites, parades, dégâts subis, temps) à la descente, nouvel affichage de bilan, `renderTrack` et écran de mort.
- `localStorage` : éventuelle clé `profondeurs.*` pour la meilleure note.
- `CHANGELOG.md`, `README.md`, `GAME_VERSION`.
- Dépend des signaux existants uniquement. Prérequis de `pactes-en-jeu` et `directeur-de-rythme`.
