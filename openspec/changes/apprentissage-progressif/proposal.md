# Proposal

## Why

Les joueurs néophytes décrochent dans les premiers étages : toutes les mécaniques défensives (esquive, parade, combo) sont disponibles d'emblée, sans qu'aucune ne soit enseignée. Le problème est un manque d'apprentissage, pas forcément des PV ou des dégâts trop élevés.

## What Changes

- Les étages 1 et 2 introduisent **une mécanique à la fois** : l'esquive d'abord, puis la parade et l'enchaînement de victimes (combo). L'étage 3, déjà gardé par le premier boss, sert d'examen et n'introduit rien.
- La composition des monstres de chaque étage d'initiation punit l'absence de la mécanique visée, pas celle des mécaniques encore inconnues.
- Un rappel discret en jeu (toast ou indice contextuel) nomme la mécanique du moment, sans écran bloquant ni tutoriel séparé.
- Les joueurs expérimentés ne sont pas ralentis : l'indice disparaît dès que la mécanique a été réussie une fois, et aucune étape n'est obligatoire.
- Valable en solo comme en duo ; chaque héros apprend sa propre mécanique.

Hors périmètre : réglage des PV et dégâts, paliers de difficulté, fenêtres d'esquive et de parade (inchangées), mode multijoueur en ligne.

## Capabilities

### New Capabilities
- `onboarding-mecaniques`: introduction progressive des mécaniques de combat sur les étages 1 à 3, composition des monstres associée et indices contextuels.

### Modified Capabilities

## Impact

- `index.html` : `rollEnemy` et `populate` (composition par étage), HUD (indices), `GAME_VERSION` et tableau `CHANGELOG`.
- `CHANGELOG.md` et `README.md` (section « Ce qui change d'un étage à l'autre »).
- Aucune dépendance ajoutée. Première étape de la série : aucun changement préalable requis.
