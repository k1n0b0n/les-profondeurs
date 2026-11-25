# Proposal

## Why

Les cinq pactes (Hordes, Acier, Fureur, Hâte, Disette) ne sont accessibles qu'après une première victoire et se choisissent à l'accueil, avant de jouer. Les experts n'ont donc aucun défi avant d'avoir gagné une fois, et le risque n'est jamais un choix fait en cours de partie, avec une récompense qu'on voit.

## What Changes

- Quand les héros prennent l'escalier vers un étage de gardien (3, 6, 9, 12), l'écran de confirmation propose **un pacte** tiré au hasard, avec sa récompense : une seconde relique légendaire par héros à la chute du gardien. Ne rien prendre reste le choix par défaut.
- Seuls les pactes dont l'effet se lit sur les monstres sont proposés : Hordes, Acier, Fureur, Hâte. Disette, qui agit au départ sur les potions, reste réservé à l'accueil.
- Un pacte pris est actif sur l'étage du gardien et sur les étages suivants, jusqu'à l'offre suivante (au plus trois étages) ; il remplace alors le précédent.
- Les pactes de départ de l'accueil (débloqués par une victoire) sont **conservés** tels quels et se cumulent avec le pacte en jeu. Ce changement ne les retire pas ; l'offre en jeu est disponible dès la première partie.
- Le record continue de compter les pactes d'une victoire, en comptant les pactes pris en jeu.
- En duo, l'offre est décidée par le héros qui a ouvert l'escalier ; le pacte s'applique aux deux et chaque héros reçoit la récompense.

Hors périmètre : nouveaux pactes, paliers de difficulté, réglage « Récit », note d'étage (la récompense est fixe ; une note pourra la moduler plus tard).

## Capabilities

### New Capabilities
- `pactes-en-partie`: offre d'un pacte avant un gardien, durée d'effet, récompense et lien avec le record.

### Modified Capabilities

## Impact

- `index.html` : `PACTS` et `hasPact`, `askDescend` et `menu-stairs` (HTML, CSS), `goDown` et `descend`, mort du gardien (relique), `snapshot` et `newRun` (reprise de partie), record et bilan, puces de la pause.
- `README.md` (section Pactes et grimoire, constantes d'équilibrage), `CHANGELOG.md`, `GAME_VERSION`.
- Plus de dépendance à `note-par-etage` : la récompense est fixe, la note devient un module optionnel du changement suivant.
