# Tasks

## 1. Collecte et calcul

- [x] 1.1 Ajouter les compteurs d'étage (`h.fl`, `L.fl`), remis à zéro dans `startFloor`, alimentés par `hurtPlayer`, `perfectDodge`, `parrySuccess`, `killEnemy` et `updateOverlays`. Vérifier en console qu'un coup encaissé, une esquive parfaite, une parade parfaite, deux victimes et 5 s de jeu mettent bien les compteurs à jour, et que le temps ne court pas en pause.
- [x] 1.2 Écrire la table `GRADE` et `gradeOf(h)` (score, lettre, valeurs des signaux), et `teamGrade()`. Vérifier les trois scénarios de calcul de la spec (étage propre, étage subi, temps long) et le cas sans combat.

## 2. Affichage et conservation

- [x] 2.1 Ajouter le bloc `floor-grade` à `menu-stairs` (HTML, CSS) et le remplir dans `askDescend`, par héros et pour l'équipe en duo. Vérifier à l'écran, sur 360 px de large aussi, et que la descente se confirme comme avant.
- [x] 2.2 Enregistrer la note dans `run.grades` à `goDown`, exposer `lastGrade()`, et sauvegarder `grades` dans `snapshot` / `newRun(saved)` avec validation. Vérifier qu'un rechargement restaure les notes et qu'une ancienne sauvegarde reste valide.
- [x] 2.3 Résumer les notes dans `win-lead`, `dead-lead` et la puce « Notes » de la pause. Vérifier les trois écrans après quelques étages simulés.

## 3. Livraison

- [x] 3.1 Documenter dans le README (nouvelle section et constantes d'équilibrage), passer `GAME_VERSION` à 1.8.0 avec les entrées `CHANGELOG` d'`index.html` et `CHANGELOG.md`, et vérifier que la tuile Nouveautés affiche 1.8.0.
- [x] 3.2 Parcourir les étages 1 à 4 sous Playwright Firefox, son coupé, en solo puis en duo : aucune erreur console, notes cohérentes, aucun effet sur le jeu.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement.
