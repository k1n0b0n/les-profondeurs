# Tasks

## 1. Relève en élan

- [x] 1.1 Ajouter la table `DUO` et faire de la fin de relève un événement : critique assuré pour le héros qui a relevé, onde `L.blasts` et étourdissement des monstres à moins de `DUO.revive.radius` (gardien seulement touché par l'onde). Vérifier en console avec des monstres proches, sans monstre, et avec un gardien.

## 2. Cordée

- [x] 2.1 Calculer `h.cordee` à chaque image (deux héros debout, distance ≤ `DUO.cordee.r`, jamais en solo), l'appliquer dans `dmgOf` et dans l'armure de `hurtPlayer` sans dépasser le plafond de 45 %. Vérifier les dégâts et l'armure à 3 unités, à 5 unités, avec un héros à terre et en solo.
- [x] 2.2 Marquer la fiche de chaque héros (classe `cordee`, CSS) et annoncer la cordée une fois par partie. Vérifier à l'écran et sur 360 px de large.

## 3. Coup double

- [x] 3.1 Mémoriser le dernier tueur dans `killEnemy` et déclencher le coup double (cran de combo, soin, message) selon la fenêtre `DUO.chain.window`, remis à zéro à chaque partie. Vérifier les trois scénarios de la spec (alternés, même héros, trop lent) et le solo.

## 4. Livraison

- [x] 4.1 Documenter dans le README (synergie du duo, relève, constantes), passer `GAME_VERSION` à 1.10.0 avec les entrées `CHANGELOG` d'`index.html` et `CHANGELOG.md`, et vérifier la tuile Nouveautés.
- [x] 4.2 Parcourir les étages 1 à 4 en duo puis en solo sous Playwright Firefox, son coupé : aucune erreur console, solo inchangé.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement.
