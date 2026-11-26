# Tasks

## 1. Étage seedé

- [x] 1.1 Ajouter un RNG seedé (mulberry32) qui remplace temporairement `rand`, `randi`, `pick`, `shuffle` pendant la génération d'étage, et faire passer les `Math.random` directs de génération par lui. Vérifier : même graine, même empreinte de grille et de nombre d'entités ; sans graine, génération aléatoire comme avant.
- [x] 1.2 Donner des identifiants stables aux entités créées par la génération (ennemis, accessoires, coffres, pièges, portails) dans l'ordre de création. Vérifier : deux pages avec la même graine ont les mêmes identifiants.

## 1b. Relais de signalisation

- [x] 1b.1 Écrire le relais (`relay/server.mjs`, salons en mémoire, 4 membres, origines autorisées, limites de débit et d'IP, `/health`) avec ses tests (`node --test`) : 5 tests passent.
- [x] 1b.2 Le livrer : Dockerfile, compose isolé (non-root, lecture seule, capacités retirées, 64 Mo, boucle locale), modèle nginx, déploiement derrière TLS sur `profondeurs.kobbo.fr`, certificat renouvelé par certbot. Vérifié en `wss://` depuis Internet : salon, jonction, signaux, origine refusée.
- [ ] 1b.3 Écrire le README du relais (protocole, variables d'environnement, déploiement, vie privée).
- [x] 1b.4 Écrire le client de signalisation : hôte (créer le salon, afficher le code, un `RTCPeerConnection` par pair annoncé, ICE trickle) et ami (écran « Rejoindre », saisie du code, `?salon=CODE`, erreurs lisibles), vérification de version à la jonction. Retirer `#join=`, `packCode`, `unpackCode`, `iceDone` et l'ancien écran de codes. Vérifier à deux pages : connexion par code seul, code inconnu, relais injoignable, version différente.

## 2. Canal d'état et héros seuls

- [x] 2.1 Créer le canal `'state'` (ordonné, fiable) dans `netInvite`/`joinStart`, avec échange d'une version de protocole et refus clair en cas d'écart. Vérifier : deux pages en boucle locale, message de version.
- [x] 2.2 Envoyer `floor` + graine au début d'un étage et reconstruire l'étage chez l'ami sans lancer la simulation (mode marionnette `NET.puppet`). Vérifier : empreinte identique, aucune boucle de simulation chez l'ami.
- [x] 2.3 Envoyer les instantanés des héros (position, orientation, PV, état) à ~20 Hz, appliquer l'ordre des numéros, interpoler, caméra et HUD de base chez l'ami. Vérifier : l'ami voit bouger les héros, y compris le sien commandé par sa manette ou son clavier.

- [ ] 2.4 Extraire de `updatePlayer` une fonction de déplacement et de collision partagée (sans effets ni sons), vérifier que le jeu local est inchangé, numéroter les trames `'f'` et renvoyer `ack` par héros dans les `snap`.
- [ ] 2.5 Prédire le déplacement et l'esquive du héros de l'ami : rejouer les commandes non acquittées sur la position autoritaire, lisser sous le seuil, recaler au-dessus, désactiver hors de l'état de jeu. Vérifier avec une latence simulée de 150 ms : le héros réagit sans retard, reste collé à l'hôte, et se recale après une poussée ou une glace.

## 3. Entités dynamiques

- [ ] 3.1 Répliquer ennemis et gardiens (création, mise à jour, retrait, animations d'attaque et de télégraphie) avec deltas et trame complète périodique. Vérifier : combat à deux pages, aucun doublon ni fantôme.
- [ ] 3.2 Répliquer projectiles, bombes, braises, butin (écus, potions, coffres) et accessoires (jarres, caisses, murs fissurés, portes, grille modifiée par `sealRoom`). Vérifier : casser une jarre et ramasser un écu chez l'hôte se voit chez l'ami.
- [ ] 3.3 Mesurer le débit à quatre joueurs avec beaucoup d'ennemis ; arrondir, borner et découper si besoin.

## 4. Événements, écrans et HUD

- [ ] 4.1 Introduire `emit(type, payload)` pour sons, toasts et effets de la logique, jouer localement chez l'hôte et rejouer chez l'ami sans doublon. Vérifier : un coup produit un seul son de chaque côté.
- [ ] 4.2 Transmettre les écrans (choix d'aptitude, boutique, autel, mort, victoire, escalier) au joueur propriétaire et renvoyer sa réponse par le canal de commandes. Vérifier : montée de niveau d'un ami, choix chez lui, effet chez l'hôte.
- [ ] 4.3 Compléter le HUD client (cartes de joueurs, PV, or, potions, minicarte, fog) depuis l'état reçu. Vérifier à l'écran à deux et quatre joueurs.

## 5. Livraison

- [ ] 5.1 Retirer le flux vidéo et son repli (`netShare`, `getDisplayMedia`, `captureStream`, piste vidéo, plafond de débit, texte de l'écran « Jouer en ligne » sur le partage), sans conserver de repli ; vérifier qu'aucune demande de partage n'apparaît et que le jeu local (solo, duo, quatre joueurs) est inchangé.
- [ ] 5.2 Mettre à jour le README (mode d'emploi, limites, vie privée), passer `GAME_VERSION` à 1.14.0 avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`, vérifier la tuile Nouveautés.
- [ ] 5.3 Parcourir un scénario complet hôte et deux amis en boucle locale : salon, deux étages, choix d'aptitude à distance, combat de gardien, déconnexion, aucune erreur console.

## Workflow follow-up

- Une fois relu et validé par Max, archiver le changement. Prévoir un essai réel à travers Internet.
