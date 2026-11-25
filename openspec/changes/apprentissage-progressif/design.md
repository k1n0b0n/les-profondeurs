# Design

## Context

Constats dans `index.html` (11 051 lignes) :

- Le tirage des monstres dépend de la profondeur : `rollEnemy` (pool pondéré, `slime` seul à l'étage 1, `rodeur` et `sorcier` dès 2, `brute`, `garde` et `artificier` dès 3, `chaman` dès 4) et `rollSquad` (escouades dès l'étage 2, 30 % de tirage libre). `populate` appelle les deux, plus un tirage de complément et les élites (dès l'étage 2).
- Un système d'indices existe : l'objet `hints` (réinitialisé à chaque partie) et `toast(title, sub, dur)`. Il est **réactif** : l'indice s'affiche après la première réussite (esquive parfaite, parade, détonation…). Rien n'est annoncé avant que le joueur ait deviné la mécanique.
- `BOSS_EVERY = 3` : l'étage 3 est déjà le gardien de la Crypte. Il reste deux étages pour enseigner, pas trois (voir la proposition, corrigée en conséquence).
- Les réussites passent par des points uniques : `perfectDodge(p)` (esquive parfaite), la fonction de parade parfaite (« Parade ! ») et `bumpCombo()` côté combo.
- Les touches sont résolues par `heroKeymap(h)`, `keyLabel` et les noms de boutons de manette ; le tactile a ses boutons à l'écran.
- Le stockage passe par le wrapper `store` (localStorage, clés `profondeurs.*`).

## Goals / Non-Goals

**Goals:**
- Un joueur qui ne connaît rien sait quoi faire à l'étage 1 sans lire de texte long.
- Aucune friction pour un joueur qui connaît déjà le jeu.
- Valeurs de composition et de rappel regroupées dans une table réglable.

**Non-Goals:**
- Pas d'écran ni de salle de tutoriel, pas de pause du monde.
- Pas de changement des PV, dégâts ou fenêtres de parade et d'esquive.
- Pas d'apprentissage du marchand, de l'autel ni des aptitudes : seuls l'esquive, la parade et le combo sont couverts.

## Decisions

**D1. Deux étages d'initiation, l'étage 3 sert d'examen.** Étage 1 : esquive. Étage 2 : parade et combo. Étage 3 : gardien, aucune nouveauté. *Alternative écartée* : trois étages d'initiation, ce qui ferait enseigner pendant le boss.

**D2. Composition par table, pas par exception dans `rollEnemy`.** Une table `ONBOARDING` indexée par profondeur (1 et 2) donne la liste des types autorisés et la taille minimale d'une rencontre ; `rollEnemy`, `rollSquad` et le tirage de complément la consultent. Étage 1 : `slime` uniquement (déjà le cas). Étage 2 : `slime`, `rodeur`, `garde` ; les `sorcier`, `artificier`, `chaman` et `brute` sont exclus, et les escouades dont le noyau les contient sont ignorées. Les élites de l'étage 2 respectent la même liste. *Alternative écartée* : ajuster les poids de `rollEnemy`, car cela ne garantit rien (un poids faible reste tirable). Conséquence : le `sorcier` n'apparaît plus qu'à l'étage 3, ce qui est assumé et réglable.

**D3. Un `garde` à l'étage 2 enseigne la parade.** Le `garde` attaque au corps à corps avec préparation visible de 0,4 s (« lecture ») ; c'est le cas d'école de la parade. Il est introduit par une rencontre de deux à trois monstres où il est présent, et non seul, pour que le combo puisse aussi se déclencher.

**D4. Indice proactif en deux temps.** À l'entrée de l'étage, `toast` annonce la mécanique et la commande (durée 4 s). Un compteur de coups encaissés consécutifs sans utiliser la mécanique (3) déclenche un rappel unique par étage. *Alternative écartée* : indice permanent au HUD, trop bruyant pour les experts.

**D5. Mémoire « apprise » persistante, par appareil.** Une clé `profondeurs.appris` (objet `{ esquive, parade, combo }`) est écrite par `store`, lue au démarrage, et mise à jour dans `perfectDodge`, la parade parfaite et `bumpCombo`. En duo, le suivi de la partie est par héros (`h.learned`) ; la clé persistante se met à jour quand tous les héros présents ont réussi. *Alternative écartée* : réutiliser `hints` seul, qui est réinitialisé à chaque partie et rappellerait l'indice aux joueurs expérimentés.

**D6. Libellés de commande.** Une fonction unique construit le texte d'indice à partir de `heroKeymap(h)`, `keyLabel` et des noms de boutons de manette ; sur écran tactile (`coarse`), le texte désigne le bouton à l'écran. En duo, les commandes des héros concernés sont séparées par « · » et préfixées « J1 », « J2 » comme `tagOf`.

**D7. Étages hors parcours inchangés.** Le mode test (choix de biome et d'étage), « Descendre plus loin » et l'étage 3 et suivants ignorent `ONBOARDING`. Une partie de test démarrée à l'étage 1 applique l'initiation comme une partie normale.

## Risks / Trade-offs

- [Étage 2 trop prévisible pour les joueurs déjà formés] → la table d'initiation s'applique toujours, mais le premier playtest décidera s'il faut la désactiver quand les trois mécaniques sont apprises ; on commence simple (toujours active).
- [Le `sorcier` disparaît de l'étage 2 et la variété baisse] → l'étage 3 a le boss, et l'élite de l'étage 2 reste possible avec les types autorisés.
- [Un toast d'entrée masque ou chevauche la bannière de gardien ou d'autres toasts] → l'étage 3 n'en affiche pas ; vérifier la file d'attente de `toast` au playtest.
- [Le stockage local est indisponible] → le wrapper `store` dégrade déjà en silence ; l'indice se comporte comme pour un joueur novice.
- [Aucun test automatisé dans le projet] → vérification par copie avec `window.__eval` et Playwright Firefox, son coupé, comme les autres changements.

## Migration Plan

Aucune migration : la clé `profondeurs.appris` est nouvelle, son absence équivaut à « rien appris ». Retour arrière : retirer la table `ONBOARDING` et les appels d'indice ; la clé inutilisée reste inoffensive. Incrémenter `GAME_VERSION` (1.6.0) avec une entrée dans `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
