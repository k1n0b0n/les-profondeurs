# Design

## Context

Le jeu est un seul fichier (~11 900 lignes). Constats de l'exploration, qui contraignent le plan :
- Boucle à pas de temps variable (`step(now)`, `realDt` plafonné à 0,05, modifié par hitStop et slowMo), sans accumulateur.
- Aucune couche « commande » : les entrées sont lues dans la simulation (`updatePlayer`, `readMove`, `heroPads`) ; le global `player` est muté dans la boucle (326 références).
- Pas de séparation données / three.js : les entités (`L.enemies`, `L.shots`, `L.bombs`, `L.coins`, `L.props`, `L.traps`…) portent leurs maillages ; des `Set`/`Map` y sont stockés.
- Aucun seed : tout passe par `rand`, `randi`, `pick`, `shuffle` et des `Math.random` directs, simulation et cosmétique mêlés.
- ~276 appels `sfx.*`, `toast`, `$(` dans la logique, et `state` modifié depuis la logique.
- Réseau actuel : hôte + flux vidéo, canal `'pad'` non ordonné (`maxRetransmits: 0`) qui ne porte que les commandes (`'f'` : masque de boutons + axes) ; `packCode`, `unpackCode`, `iceDone`, `netWire` réutilisables.

## Goals / Non-Goals

**Goals:** chacun joue dans son navigateur avec son écran ; seul l'état utile circule ; jusqu'à quatre joueurs ; le mode local est intact ; chaque étape se joue seule.

**Non-Goals:** lockstep, prédiction des dégâts, des ennemis et des effets, serveur, TURN, reconnexion, anti-triche, tactile en ligne, repli vidéo.

## Decisions

**D1. Hôte autoritaire, clients en rendu.** Le lockstep est écarté (pas de temps variable, hasard non seedé, simulation couplée au rendu). L'hôte garde la simulation inchangée ; le client exécute le même fichier en « mode marionnette » : il n'appelle ni `updatePlayer`, ni `updateEnemies`, ni les autres `update*` de simulation, seulement la mise en scène (caméra, particules, lumières, musique, HUD) alimentée par l'état reçu.

**D2. Graine pour la génération seule.** Une fonction `rnd()` remplace tous les `Math.random()` du jeu : elle puise dans un RNG seedé (mulberry32) pendant `buildLevel`, sinon dans `Math.random`. Les UUID de three.js gardent le vrai `Math.random` : redéfinir `Math.random` lui-même a été essayé et écarté, car chaque objet ou géométrie créé consomme le flux et rend l'étage dépendant de caches paresseux. La graine ne suffit pas : l'étage dépend aussi du **contexte de génération**, que l'hôte envoie avec elle : profondeur, pression du directeur (`directorPressure`, passée à `buildLevel`), ordre des biomes (`runBiomes`, tiré au hasard à chaque partie), pactes et voeu (`run.pacts`, `run.vow`), mode Récit, nombre de héros. Hôte et clients passent la même graine et ce contexte, donc obtiennent la même grille, le même décor, les mêmes pièges et les mêmes entités initiales (`spawnEnemy`, `spawnProp`, `spawnChest`…). Les entités initiales reçoivent leur identifiant dans l'ordre de création, identique chez tous. Hors de cette fenêtre, `Math.random` reste en vigueur. Vérification : empreinte (hash) de la grille et du nombre d'entités comparée entre deux pages.

**D3. Identifiants stables.** Chaque entité réplicable reçoit `id` (compteur de l'hôte, ou ordre de création pour les entités de génération) et un `kind`. Une table `id → entité` côté client permet de créer, mettre à jour et retirer les marionnettes. Les Set/Map internes ne sont jamais envoyés.

**D4. Canal d'état séparé.** Un second `RTCDataChannel` (`'state'`, ordonné et fiable) porte les messages JSON compacts hôte → client : `seed`/`floor` au début d'étage, `snap` (≈ 20 Hz : numéro, temps, héros, ennemis, tirs, bombes, butin, accessoires modifiés), `ev` (événements ponctuels, numérotés). Le canal `'pad'` actuel (non ordonné) reste pour les commandes client → hôte. Les instantanés sont des deltas par rapport à une base régulière (trame complète toutes les 2 s) pour limiter le débit ; le client ignore tout `snap` de numéro inférieur au dernier. Le plafond de taille d'un message est respecté (découpage au besoin).

**D5. Marionnettes et interpolation.** Le client construit ses maillages avec les mêmes fabriques que l'hôte (`spawnEnemy`, `spawnShot`, …) mais en lecture seule : il pose la position/orientation/état d'animation reçus et interpole entre les deux derniers instantanés (retard d'affichage ≈ 100 ms). Les fonctions de création sont découplées de leur logique (pas d'IA, pas de dégâts) par un indicateur `NET.puppet`.

**D6. Événements.** Les appels `sfx.*`, `toast`, effets de coup et transitions d'écran de la logique de l'hôte passent par une fonction `emit(type, payload)` qui joue localement chez l'hôte (comportement actuel) et met l'événement en file pour les amis. Le client rejoue l'événement dans sa propre interface ; les sons déclenchés localement par les marionnettes sont coupés pour éviter les doublons. Les écrans (`openChoice`, `openShop`, `openAltar`, `die`, escalier) sont envoyés au seul joueur propriétaire ; sa réponse revient par le canal de commandes.

**D7. HUD client.** Le HUD (cartes de joueurs, PV, or, potions, minicarte, fog) est calculé depuis l'état reçu. Le fog `L.seen` reste partagé (calculé par l'hôte, repris par `reveal()` côté client à partir des positions des héros).

**D8. Mode vidéo retiré, sans repli.** `netShare`, `netDrop` côté flux, `getDisplayMedia`, `captureStream`, la piste vidéo et le plafond de débit sont supprimés ; aucun repli vidéo n'est conservé. Les étapes 1 à 4 se font sur une branche de travail, où le mode en ligne n'est pas jouable de bout en bout avant l'étape 4 ; le retrait et la publication se font quand les quatre étapes sont complètes. Une version de protocole est échangée à l'ouverture du canal : une version différente est refusée avec un message.

**D9. Prédiction locale du héros de l'ami.** Chaque trame de commande `'f'` reçoit un numéro (`s`). L'hôte garde par héros distant le dernier numéro traité (`ack`) et l'ajoute à chaque `snap`. Le client conserve les commandes non acquittées et, à chaque `snap`, repart de la position autoritaire de son héros puis rejoue ces commandes avec la même fonction de déplacement que l'hôte (même grille grâce à la graine, mêmes collisions et mêmes vitesses lues dans l'état reçu). Seuls le déplacement et l'esquive sont prédits. L'écart entre position prédite et position reconstruite est corrigé par un lissage exponentiel (~100 ms) en dessous d'un seuil (≈ 1,5 unité, à régler au jeu) et par un recalage immédiat au-dessus (repoussement, gel, glace, téléportation, laisse, portail). Aucune prédiction hors de l'état de jeu (menus, pause). L'extraction d'une fonction de déplacement partagée par la simulation de l'hôte et la prédiction du client est une condition : l'hôte ne change pas de comportement.

**D10. Étapes.** Chaque étape livre un état testable à deux pages : (1) graine, vérifiée par empreinte ; (2) canal d'état, héros seuls et prédiction : les amis se voient bouger dans un étage vide, le héros local réagit sans retard ; (3) entités dynamiques ; (4) événements, écrans, HUD.

## Risks / Trade-offs

- [La séparation simulation/rendu touche ~326 références à `player` et des centaines d'effets] → on ne modifie pas la simulation de l'hôte ; on ajoute un mode marionnette et on branche les effets via `emit` par petits lots, étape par étape.
- [Des `Math.random` de simulation appelés pendant la génération rompent l'identité] → vérification par empreinte à l'étape 1 et liste des appels de génération (exploration : l.2244-3132, 5708-5961).
- [Écrans et états déclenchés par la logique (`state`)] → transmis comme événements numérotés, le client ne change jamais `state` de lui-même.
- [Débit des instantanés à quatre joueurs et beaucoup d'ennemis] → deltas, arrondi des positions, trame complète périodique ; mesure du débit à l'étape 3.
- [La prédiction diverge de l'hôte (poussées, glace, pièges, laisse, portails)] → on ne prédit que le déplacement et l'esquive, avec un lissage et un recalage au-delà du seuil ; seuil réglé en jouant avec une latence simulée.
- [La fonction de déplacement est entremêlée à `updatePlayer` (effets, sons, dégâts)] → extraire une fonction pure de déplacement et de collision appelée par `updatePlayer` et par le client ; vérifier que le jeu local n'a pas changé.
- [Divergence si l'hôte change de version] → une version de protocole est échangée à la connexion, et une page de version différente est refusée avec un message.
- [Aucun test automatisé] → vérification sous Playwright Firefox, deux pages dans le même contexte (méthode du changement `multi-en-ligne`).

## Migration Plan

Rien à migrer. Travail sur une branche, fusionnée une fois les quatre étapes complètes. Retour arrière : revenir à la 1.13.0 (mode vidéo). Version 1.14.0 à la livraison, avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.

## Open Questions

Aucune.
