# Tasks

## 1. Directeur

- [x] 1.1 Compter les héros tombés par étage (`L.fl.downs`) et l'écrire dans `run.grades` à `goDown`, avec validation à la reprise. Vérifier qu'un héros mis à terre en duo incrémente le compteur et que l'entrée l'enregistre.
- [x] 1.2 Écrire la table `DIRECTOR` et `directorPressure(depth)` (note la plus basse, plafond après héros à terre, étages 1, 2 et gardien à 0). Vérifier les scénarios de la spec pour S, A, B, C, héros tombé, duo inégal et étage exempté.
- [x] 1.3 Appliquer la pression dans `populate` (total de monstres, embuscades, élites, potion d'étage) et stocker `L.pressure`. Vérifier sur 40 étages générés par pression : effectifs moyens ordonnés, embuscades dans les bornes, élites garanties intactes, aucun changement de PV, dégâts ni vitesse d'un monstre.

## 2. Mode Récit

- [x] 2.1 Ajouter le réglage Récit (clé `profondeurs.recit`, ligne `Oui/Non` à l'accueil, bouton rapide dans la pause) sur le modèle d'attaque auto, et le faire forcer la pression à -1. Vérifier le réglage mémorisé après rechargement et la pression à -1 sur tous les étages.
- [x] 2.2 Marquer `run.recit`, le sauvegarder, bloquer `recordBest` et signaler le mode dans les bilans de victoire et de mort. Vérifier qu'une victoire simulée en Récit laisse le record intact et que la reprise de partie conserve le marquage.

## 3. Livraison

- [x] 3.1 Documenter dans le README (« Réglages d'équilibrage », section directeur et Récit), passer `GAME_VERSION` à 1.9.0 avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`, et vérifier la tuile Nouveautés.
- [x] 3.2 Parcourir les étages 1 à 7 sous Playwright Firefox, son coupé, en solo puis en duo, avec Récit désactivé puis activé : aucune erreur console, effectifs cohérents avec la pression.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement.
