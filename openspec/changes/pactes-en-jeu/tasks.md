# Tasks

## 1. Modèle du pacte en jeu

- [x] 1.1 Ajouter `run.vow`, `run.vowFloor` et `run.taken` (remis à zéro dans `newRun`) et faire lire `hasPact` sur `run.pacts` et `run.vow`. Vérifier en console qu'un pacte posé dans `run.vow` agit sur `spawnEnemy` (PV, vitesse ou dégâts d'un monstre généré).
- [x] 1.2 Faire compter `run.pacts.length + run.taken` dans `recordKey`, `winRun`, le bilan de victoire et `grimoire.bestHeat`. Vérifier qu'une victoire simulée sous un pacte de départ et un pacte en jeu affiche deux pactes.
- [x] 1.3 Écrire et relire `vow`, `vowFloor` et `taken` dans `snapshot` et `newRun(saved)` avec validation de l'identifiant. Vérifier qu'un rechargement en cours de partie restaure le pacte, et qu'une sauvegarde sans ces champs reste valide.

## 2. Offre dans l'écran de l'escalier

- [x] 2.1 Ajouter le bloc d'offre (nom, effet, récompense, bouton à bascule) à `menu-stairs` en HTML et CSS, masqué par défaut. Vérifier l'affichage avec la console puis à l'écran, sur écran étroit aussi.
- [x] 2.2 Dans `askDescend`, tirer le pacte une seule fois par escalier (`L.pactOffer`) quand `isBossFloor(L.depth + 1)`, en excluant `disette` et les pactes déjà actifs, et cacher le bloc sinon. Vérifier sur 50 tirages l'absence de `disette` et de doublon, et l'absence d'offre vers l'étage 4.
- [x] 2.3 Faire écrire `run.vow`, `run.vowFloor` et `run.taken` par `goDown` selon l'état du bouton (pris, refusé, repris), le refus restant le défaut. Vérifier les trois scénarios de la spec (descente sans pacte, changement d'avis, remplacement et fin par refus).
- [x] 2.4 Vérifier la navigation clavier, manette et tactile du bouton à bascule, et le cas duo (le propriétaire `stairsHero` décide, le pacte vaut pour les deux).

## 3. Récompense et visibilité

- [x] 3.1 À la chute du gardien, pousser un second choix `relic` par héros quand `run.vow` est actif et `run.vowFloor === L.depth`. Vérifier deux choix par héros en solo et en duo, un seul quand le pacte vient d'une offre précédente, et le repli quand `rollPerks` manque de légendaires.
- [x] 3.2 Annoncer le pacte actif à l'arrivée sur l'étage du gardien (`toast`) et ajouter la puce « Pacte » dans `renderRunChips`. Vérifier à l'écran, sans chevauchement avec la bannière du gardien.
- [x] 3.3 Documenter dans le README (Pactes et grimoire, constantes d'équilibrage) et passer `GAME_VERSION` à 1.7.0 avec les entrées `CHANGELOG` d'`index.html` et `CHANGELOG.md`. Vérifier que la tuile Nouveautés affiche 1.7.0.

## 4. Intégration

- [x] 4.1 Parcourir les étages 2 à 6 sous Playwright Firefox, son coupé, en solo puis en duo, avec un pacte pris puis un refus : aucune erreur console, effets visibles sur les monstres, récompense reçue.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement.
