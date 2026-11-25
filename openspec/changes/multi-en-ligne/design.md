# Design

## Context

Le jeu est un seul fichier de plus de 11 000 lignes, sans serveur ni seed aléatoire (92 appels à `Math.random`), avec des maillages liés directement aux entités de simulation. L'état des manettes est construit par `updatePad`, qui lit `readPads()` (la liste des `Gamepad`) et alimente `padStates`, lu par tout le reste : entrées de jeu, salon, propriétaire des menus. Les appareils des héros sont des descripteurs (`{ kind: 'pad', index }`) et `heroPads(h)` lit `padStates`.

## Goals / Non-Goals

**Goals:** jouer jusqu'à quatre, certains à distance, sans serveur de jeu, sans réécrire le moteur, de façon robuste.

**Non-Goals:** rendu et simulation côté client, anti-triche, reconnexion, serveur de salons.

## Decisions

**D1. L'hôte simule, l'ami regarde et commande (« Remote Play »).** Trois architectures ont été comparées :
- *Lockstep déterministe* (chaque machine simule) : exige un hasard à graine, un pas de temps fixe, et une séparation du hasard visuel et du hasard de simulation sur 92 appels ; les réglages locaux (aide tactile, attaque auto, Récit) et les écarts de flottants entre moteurs de navigateur font diverger sans détection. Écartée.
- *Réplication d'état* (l'hôte simule, les clients rendent) : demande de séparer simulation et rendu pour chaque système (monstres, tirs, pièges, objets, menus), dizaines de sous-systèmes sans tests. Meilleure fidélité à terme, trop risquée en une fois. Gardée comme version 2.
- *Flux vidéo de l'hôte et commandes distantes* : zéro divergence possible, tout le moteur et toutes les interfaces (HUD, menus, choix d'aptitudes) restent identiques, parité totale avec le local. Retenue.
Coût accepté : latence d'affichage de l'ordre de 100 à 250 ms, qualité d'image bornée par le débit de l'hôte, résolution de l'hôte. Le jeu est une coopération à rythme modéré (annonces de 0,4 s, esquives de 0,2 s) ; ce coût est acceptable et sera mesuré.

**D2. Manette virtuelle.** `readPads()` ajoute, pour chaque ami connecté, un faux `Gamepad` (`index` ≥ 1000, `mapping: 'standard'`, 17 boutons, 4 axes) construit depuis la dernière trame reçue. `updatePad`, le salon (`pad-1000`), `heroPads`, `padBinds` (disposition commune par défaut), les menus du propriétaire et le démarrage de partie fonctionnent sans autre changement. `updatePad` ne supprime pas ces entrées tant que la connexion vit.

**D3. Trame de commande.** L'ami envoie à 30 Hz (et au changement) un objet compact : masque de boutons d'une manette standard et deux axes de déplacement. Les commandes viennent de sa première manette standard ou, à défaut, de son clavier (déplacement, attaque, esquive, parade, potion selon ses touches, Entrée comme validation). La pause n'est jamais transmise.

**D4. Signalisation sans serveur.** `RTCPeerConnection` avec un serveur STUN public. L'hôte crée une offre, attend la fin de la collecte ICE (plafonnée à 3 s), la compresse (`deflate-raw` quand `CompressionStream` existe, sinon texte brut) et la met dans le fragment du lien (`#join=…`). L'ami colle ou ouvre le lien, produit une réponse compressée de la même façon, et la renvoie à l'hôte par n'importe quel message. Pas de serveur, pas de compte. *Alternative écartée* : un courtier public (PeerJS) simplifierait l'échange mais ajouterait une dépendance et un tiers qui voit les connexions.

**D5. Flux vidéo.** L'hôte capture son onglet (`getDisplayMedia`, avec audio quand le navigateur le permet) pour inclure le HUD et les menus ; à défaut ou en cas de refus, il retombe sur `canvas.captureStream`, sans interface, en le signalant. Le débit est plafonné (2,5 Mb/s par ami) et une seule capture alimente toutes les connexions.

**D6. Mode client sans moteur.** Un lien `#join=` démarre la page en mode « Rejoindre » : aucune boucle de jeu, aucun salon ; seul le module réseau et la vue plein écran sont actifs.

**D7. Plafond de quatre.** Le salon ne contient que quatre emplacements ; un cinquième ami reste sans emplacement.

## Risks / Trade-offs

- [Latence et qualité vidéo variables] → débit plafonné, indicateur de latence, avertissement dans la documentation ; la version 2 (réplication d'état) la supprimerait.
- [Partage d'écran indisponible ou refusé (Safari, Firefox)] → repli sur le flux du canevas, signalé.
- [Connexion impossible derrière certains réseaux (NAT symétrique)] → pas de serveur TURN ; le message d'échec l'explique.
- [Un lien d'invitation expose l'adresse IP de l'hôte à son destinataire et au serveur STUN] → à n'envoyer qu'à des amis ; mentionné dans le README.
- [Aucun test automatisé] → vérification sous Playwright Firefox avec deux pages en boucle locale.

## Migration Plan

Rien à migrer. Retour arrière : retirer le module réseau et les manettes virtuelles. Version 1.13.0, avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
