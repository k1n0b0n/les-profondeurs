# Tasks

## 1. Étage seedé

- [x] 1.1 Ajouter un RNG seedé (mulberry32) qui remplace temporairement `rand`, `randi`, `pick`, `shuffle` pendant la génération d'étage, et faire passer les `Math.random` directs de génération par lui. Vérifier : même graine, même empreinte de grille et de nombre d'entités ; sans graine, génération aléatoire comme avant.
- [x] 1.2 Donner des identifiants stables aux entités créées par la génération (ennemis, accessoires, coffres, pièges, portails) dans l'ordre de création. Vérifier : deux pages avec la même graine ont les mêmes identifiants.

## 1b. Relais de signalisation

- [x] 1b.1 Écrire le relais (`relay/server.mjs`, salons en mémoire, 4 membres, origines autorisées, limites de débit et d'IP, `/health`) avec ses tests (`node --test`) : 5 tests passent.
- [x] 1b.2 Le livrer : Dockerfile, compose isolé (non-root, lecture seule, capacités retirées, 64 Mo, boucle locale), modèle nginx, déploiement derrière TLS sur `profondeurs.kobbo.fr`, certificat renouvelé par certbot. Vérifié en `wss://` depuis Internet : salon, jonction, signaux, origine refusée.
- [x] 1b.3 Écrire le README du relais (protocole, variables d'environnement, déploiement, vie privée).
- [x] 1b.4 Écrire le client de signalisation : hôte (créer le salon, afficher le code, un `RTCPeerConnection` par pair annoncé, ICE trickle) et ami (écran « Rejoindre », saisie du code, `?salon=CODE`, erreurs lisibles), vérification de version à la jonction. Retirer `#join=`, `packCode`, `unpackCode`, `iceDone` et l'ancien écran de codes. Vérifier à deux pages : connexion par code seul, code inconnu, relais injoignable, version différente.

- [x] 1b.5 Salon en ligne : places automatiques des amis chez l'hôte (textes et code dédiés), écran « Choisis ton héros » chez l'ami (choix par clic ou flèches, liste des joueurs en direct), seul l'hôte lance la partie. Vérifié à deux fenêtres.

## 2. Canal d'état et héros seuls

- [x] 2.1 Créer le canal `'state'` (ordonné, fiable) dans `netInvite`/`joinStart`, avec échange d'une version de protocole et refus clair en cas d'écart. Vérifier : deux pages en boucle locale, message de version.
- [x] 2.2 Envoyer `floor` + graine au début d'un étage et reconstruire l'étage chez l'ami sans lancer la simulation (mode marionnette `NET.puppet`). Vérifier : empreinte identique, aucune boucle de simulation chez l'ami.
- [x] 2.3 Envoyer les instantanés des héros (position, orientation, PV, état) à ~20 Hz, appliquer l'ordre des numéros, interpoler, caméra et HUD de base chez l'ami. Vérifier : l'ami voit bouger les héros, y compris le sien commandé par sa manette ou son clavier.

- [x] 2.4 Extraire `moveHeroBody` (déplacement et collisions) de `movePlayer`, vérifier que le jeu local est inchangé, numéroter les trames `'f'` (30 Hz) et renvoyer par héros dans les `snap` le dernier numéro traité, la vitesse effective et l'état de l'hôte.
- [x] 2.5 Prédire le déplacement du héros de l'ami (l'esquive reste celle de l'hôte) : historique des positions par numéro de trame, écart avec la position de l'hôte à la trame acquittée, lissage sous 1,5 unité, recalage au-dessus, aucune prédiction hors de l'état de jeu. Vérifié avec 150 ms de latence simulée dans chaque sens : le héros réagit sans retard, reste collé à l'hôte, se recale après une téléportation, et ne bouge pas quand l'hôte est en pause.

## 3. Entités dynamiques

- [x] 3.1 Répliquer ennemis et gardiens (création, mise à jour, retrait, animations d'attaque et de télégraphie) avec deltas et trame complète périodique. Vérifier : combat à deux pages, aucun doublon ni fantôme.
- [x] 3.2 Répliquer projectiles, bombes, braises, butin (écus, potions, coffres) et accessoires (jarres, caisses, murs fissurés, portes, grille modifiée par `sealRoom`). Vérifier : casser une jarre et ramasser un écu chez l'hôte se voit chez l'ami. Répliqués : tirs, bombes (avec lancer), butin, potions, coffres, accessoires détruits, lames, piques et jets de feu (temps synchronisé), portes d'embuscade et de salles. Non répliqués (voir README) : braises, vagues, rochers de piège, stalactites, marques du gardien, couvercle des sarcophages.
- [x] 3.3 Mesurer le débit avec beaucoup d'ennemis ; arrondir, borner et découper si besoin. Mesuré : 12 Ko/s avec 8 ennemis, 40 Ko/s avec 21 ennemis autour des héros (ennemis lointains non envoyés, positions arrondies) ; aucun découpage nécessaire.

## 4. Événements, écrans et HUD

- [x] 4.1 Introduire `emit(type, payload)` pour sons, toasts et effets de la logique, jouer localement chez l'hôte et rejouer chez l'ami sans doublon. Vérifier : un coup produit un seul son de chaque côté.
- [x] 4.2 Transmettre les écrans (choix d'aptitude, boutique, autel, mort, victoire, escalier) au joueur propriétaire et renvoyer sa réponse par le canal de commandes. Vérifier : montée de niveau d'un ami, choix chez lui, effet chez l'hôte.
- [x] 4.3 Compléter le HUD client (cartes de joueurs, PV, or, potions, minicarte, fog) depuis l'état reçu. Vérifier à l'écran à deux et quatre joueurs.

## 5. Livraison

- [x] 5.1 Retirer le flux vidéo et son repli (`netShare`, `getDisplayMedia`, `captureStream`, piste vidéo, plafond de débit, texte de l'écran « Jouer en ligne » sur le partage), sans conserver de repli ; vérifier qu'aucune demande de partage n'apparaît et que le jeu local (solo, duo, quatre joueurs) est inchangé.
- [x] 5.2 Mettre à jour le README (mode d'emploi, limites, vie privée), passer `GAME_VERSION` à 1.14.0 avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`, vérifier la tuile Nouveautés.
- [x] 5.3 Parcourir un scénario complet hôte et deux amis en boucle locale : salon, deux étages, choix d'aptitude à distance, combat de gardien, déconnexion, aucune erreur console.
- [x] 5.4 Avertir l'hôte quand son onglet passe en arrière-plan (la partie se fige pour tous), et les amis par un message de l'hôte.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement. Prévoir un essai réel à travers Internet.
