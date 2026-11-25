# Tasks

## 1. Composition des étages d'initiation

- [x] 1.1 Ajouter la table `ONBOARDING` (types autorisés et taille minimale de rencontre pour les étages 1 et 2) près de `SQUADS` dans `index.html`, et vérifier qu'elle se charge sans erreur console.
- [x] 1.2 Faire consulter la table par `rollEnemy`, `rollSquad`, le tirage de complément et les élites de `populate`, et vérifier par un échantillon de 20 étages 2 générés (mode test) qu'aucun sorcier, artificier, chaman ni brute n'apparaît.
- [x] 1.3 Garantir au moins une rencontre de trois monstres ou plus contenant un `garde` à l'étage 2, et vérifier sur le même échantillon.
- [x] 1.4 Vérifier que l'étage 3 et les étages plus profonds tirent encore tous les types (échantillon de 20 étages 3).
- [x] 1.5 Documenter la table dans le README (« Ce qui change d'un étage à l'autre » et « Réglages d'équilibrage »), et relire que les numéros de ligne cités restent exacts.

## 2. Mémoire « apprise »

- [x] 2.1 Lire et écrire la clé `profondeurs.appris` (`{ esquive, parade, combo }`) via le wrapper `store`, et vérifier qu'une valeur absente ou le stockage inaccessible donne « rien appris » sans exception.
- [x] 2.2 Marquer l'état par héros (`h.learned`) dans `perfectDodge`, la parade parfaite et `bumpCombo` (combo de deux victimes), puis mettre à jour la clé persistante quand tous les héros présents ont réussi. Vérifier en solo et en duo avec la console du navigateur (`localStorage`).
- [x] 2.3 Réinitialiser `h.learned` à chaque nouvelle partie sans toucher à la clé persistante, et vérifier qu'une deuxième partie conserve l'état appris.

## 3. Indices proactifs

- [x] 3.1 Écrire le constructeur de texte de commande (touche personnalisée, bouton de manette, bouton tactile) à partir de `heroKeymap`, `keyLabel` et des noms de boutons, et vérifier clavier, manette et émulation tactile.
- [x] 3.2 Afficher l'indice d'entrée d'étage (esquive à l'étage 1, parade et enchaînement à l'étage 2) via `toast`, sans overlay ni pause, absent à l'étage 3 et au-delà. Vérifier à l'écran.
- [x] 3.3 Retirer l'indice dès la réussite de la mécanique et l'omettre si elle est apprise ; en duo, ne nommer que les héros concernés, avec préfixes « J1 » et « J2 ». Vérifier un scénario à deux joueurs.
- [x] 3.4 Ajouter le rappel unique par étage après trois coups encaissés sans utiliser la mécanique, et vérifier qu'il ne se répète pas dans le même étage.
- [x] 3.5 Vérifier le mode test (étage 1 et gardien), « Descendre plus loin » et le chevauchement avec la bannière de gardien, puis vérifier les parcours sans son (son et musique coupés dès le chargement).

## 4. Livraison

- [x] 4.1 Incrémenter `GAME_VERSION` à 1.6.0 avec l'entrée dans le tableau `CHANGELOG` d'`index.html` et dans `CHANGELOG.md`, et vérifier que la tuile Nouveautés de l'accueil l'affiche.
- [ ] 4.2 Jouer une partie complète d'initiation (étages 1 à 3) en solo puis en duo sous Playwright Firefox : aucune erreur console, indices cohérents, boss sans nouvel indice.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement.
