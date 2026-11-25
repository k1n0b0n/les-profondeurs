# Design

## Context

Constats dans `index.html` :

- Les pactes sont une table `PACTS` (`hordes`, `acier`, `fureur`, `hate`, `disette`). `hasPact(id)` lit `run.pacts`, rempli dans `newRun` depuis `chosenPacts` (choix de l'accueil, visibles seulement si `grimoire.wins > 0`). Les effets sont lus à la création des monstres (`spawnEnemy` : `acier`, `hate`, `fureur`) et du niveau (`populate` : `hordes`), `disette` au départ de partie.
- Le record (`recordKey`) et le bilan comptent `run.pacts.length` comme « chaleur » (`heat`) ; `grimoire.bestHeat` aussi.
- L'écran de confirmation de l'escalier existe : `askDescend(who)` ouvre `menu-stairs` (état `stairs`, dans `FROZEN`), `stairsHero` est le propriétaire du menu en duo (`menuOwner`), `goDown` lance `descend`, qui construit l'étage suivant via `startFloor(L.depth + 1)`.
- À la chute d'un gardien, le code pousse un `{ kind: 'relic', hero }` par héros dans `pendingChoices`, et `rollPerks` garantit une légendaire pour ce type.
- `snapshot` / `newRun(saved)` sauvegardent et reprennent la partie (`pacts: run.pacts.slice()`).
- `renderRunChips` dessine les puces de la pause.

## Goals / Non-Goals

**Goals:**
- Une offre lisible, ignorable en un geste, au bon moment (déjà en pause, avant l'étage qui la rend significative).
- Aucun nouvel état de jeu ni nouvel écran : réutiliser `menu-stairs`.

**Non-Goals:**
- Pas de changement des effets des pactes existants.
- Pas de retrait des pactes de départ de l'accueil.
- Pas de récompense proportionnelle à la maîtrise (`note-par-etage`).

## Decisions

**D1. L'offre vit dans l'écran de l'escalier.** `askDescend` ajoute un bloc d'offre quand `isBossFloor(L.depth + 1)` : nom, effet, récompense et un bouton à bascule « Prendre le pacte » (`aria-pressed`, refus par défaut). Le bouton « Descendre » confirme, tel quel. Avantages : navigation clavier, manette et tactile déjà gérées par `keyMenu`, propriétaire du menu déjà défini en duo (`stairsHero`). *Alternative écartée* : un overlay dédié, qui demanderait un état, une navigation et une gestion du duo en plus.

**D2. Tirage fixé à l'ouverture de l'écran.** Le pacte proposé est tiré une fois par escalier et mémorisé (`L.pactOffer`), pour qu'annuler puis rouvrir l'écran ne permette pas de retirer. Le pool exclut `disette` (effet de départ) et tout pacte déjà actif (`hasPact`).

**D3. Deux notions distinctes.** `run.pacts` reste la liste des pactes de départ, permanents. Deux champs s'ajoutent : `run.vow` (identifiant du pacte en jeu actif, ou `null`) et `run.vowFloor` (étage du gardien auquel il a été pris), ainsi que `run.taken` (nombre de pactes pris en jeu). `hasPact(id)` devient `run.pacts.includes(id) || run.vow === id`, ce qui laisse les trois sites d'effet inchangés. *Alternative écartée* : mélanger le pacte en jeu dans `run.pacts` ; il faudrait alors le retirer à l'expiration sans toucher aux pactes de départ.

**D4. Durée : jusqu'à la prochaine offre.** `run.vow` n'est écrit qu'à la descente vers un étage de gardien (dans `goDown`, avant `descend`) : pris → `vow = id`, `vowFloor = L.depth + 1`, `taken++` ; refusé → `vow = null`. Le pacte s'applique donc à l'étage du gardien et aux deux suivants, car l'étage est construit après l'écriture. Les étages de gardien suivants font partie de la même règle, y compris après la victoire (descente sans fin).

**D5. Récompense à la chute du gardien.** Dans le bloc existant qui pousse les `relic`, si `run.vow && run.vowFloor === L.depth`, on pousse un second `{ kind: 'relic', hero }` par héros. `rollPerks` tire à nouveau parmi les légendaires restantes, avec repli sur les rares quand il n'y en a plus. La récompense est fixe pour tous les pactes ; la différencier selon le pacte est une piste de réglage.

**D6. Chaleur du record.** `heat` devient `run.pacts.length + run.taken` partout où il est lu (`recordKey`, `winRun`, bilan, `grimoire.bestHeat`). Le mode test (`debugRun`) ne propose ni ne compte rien, comme avant.

**D7. Visibilité.** À l'arrivée sur l'étage du gardien, `toast` nomme le pacte actif ; `renderRunChips` ajoute une puce « Pacte » dans la pause tant qu'un pacte en jeu est actif.

**D8. Reprise de partie.** `snapshot` écrit `vow`, `vowFloor` et `taken` ; `newRun(saved)` les relit avec validation (identifiant connu, sinon `null`).

## Risks / Trade-offs

- [Une récompense unique pour des pactes de poids très différents (Hâte et Hordes ne se valent pas)] → la table reste réglable ; un premier playtest dira s'il faut une récompense par pacte.
- [Un pacte actif sur trois étages mais récompensé une seule fois] → assumé : c'est le coût du défi ; réduire la durée à l'étage du gardien seul est une option si le jeu devient trop dur.
- [Ajout de contenu à un écran de confirmation déjà chargé] → le bloc n'apparaît que sur les trois ou quatre descentes concernées par partie.
- [`rollPerks` à court de légendaires en fin de partie] → repli existant sur les rares ; vérifier le cas dans les tests.
- [Aucun test automatisé] → vérification par copie avec `window.__eval` sous Playwright Firefox, son coupé, comme les autres changements.

## Migration Plan

Aucune migration : les champs `vow`, `vowFloor` et `taken` sont absents des sauvegardes existantes, ce qui équivaut à « aucun pacte pris ». Retour arrière : retirer le bloc d'offre et le second choix de relique. Incrémenter `GAME_VERSION` (1.7.0), avec l'entrée `CHANGELOG` dans `index.html` et `CHANGELOG.md`.
