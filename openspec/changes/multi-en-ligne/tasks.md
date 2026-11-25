# Tasks

## 1. Manettes virtuelles

- [x] 1.1 Faire fournir par `readPads()` des manettes virtuelles issues d'un registre de trames, protéger leurs entrées dans `updatePad`, et vérifier qu'une trame injectée en console fait rejoindre le salon, déplacer et attaquer un héros comme une vraie manette.

## 2. Module réseau (hôte)

- [x] 2.1 Écrire l'encodage des codes (compression, fragment de lien), la capture de l'écran avec son repli, et la création d'une invitation (offre, canal de commandes, flux). Vérifier la génération d'un lien et le décodage aller-retour.
- [x] 2.2 Accepter la réponse d'un ami, recevoir ses trames, plafonner le débit vidéo, gérer la déconnexion et le plafond de quatre joueurs. Vérifier avec deux pages en boucle locale : connexion, trames reçues, flux vidéo reçu.
- [x] 2.3 Ajouter l'écran « Jouer en ligne » au salon (HTML, CSS, liste des amis, copie du lien, saisie de la réponse, état). Vérifier le parcours à l'écran.

## 3. Mode client

- [x] 3.1 Détecter `#join=` au démarrage sans lancer le moteur, afficher l'écran « Rejoindre », produire le code de réponse et établir la connexion. Vérifier un lien valide, un lien tronqué, et l'absence de boucle de jeu.
- [x] 3.2 Afficher le flux en plein écran avec aide, latence et bouton Quitter, et envoyer les trames (manette standard, sinon clavier). Vérifier côté hôte qu'un clavier distant déplace et fait attaquer un héros, et qu'un menu de choix se pilote à distance.

## 4. Livraison

- [x] 4.1 Documenter dans le README (mode d'emploi, limites, vie privée), passer `GAME_VERSION` à 1.13.0 avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`, et vérifier la tuile Nouveautés.
- [x] 4.2 Parcourir un scénario complet hôte et ami en boucle locale : salon, deux étages, choix d'aptitude à distance, déconnexion, aucune erreur console.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement. Prévoir un essai réel à travers Internet.
