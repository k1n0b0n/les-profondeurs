# Design

## Context

Constats dans `index.html` :

- La relève est dans `updateRevives(dt)` : un héros à terre se relève après 2,2 s passées à moins de 1,8 unité d'un allié debout, avec 40 % de PV et 1,5 s d'invulnérabilité. Aucun effet autour.
- Les dégâts d'un héros passent par `dmgOf(h)` ; les dégâts subis par `hurtPlayer`, où l'armure est plafonnée à 45 % (`Math.min(0.45, p.armor)`).
- `killEnemy(e)` attribue la victime à `player` (le tueur, fixé par `withHero`), met à jour `combo`, et dispose de `heal`, `floatText`, `burst`, `ring`, `L.blasts` (ondes) et `stunEnemy(e, by)`.
- Le temps de jeu cumulé est `elapsed`. Les fiches de héros sont `#pcard-1` et `#pcard-2`. `heroes` compte 1 ou 2 héros.

## Goals / Non-Goals

**Goals:**
- Trois mécaniques courtes, lisibles, qui poussent à rester proches et à alterner.
- Aucun effet en solo et aucune dépendance aux nouvelles entrées utilisateur.

**Non-Goals:**
- Pas de nouvel objet de décor, d'aptitude ni d'épreuve à deux rôles.

## Decisions

**D1. Table unique `DUO`.** `{ revive: { radius: 3, dmg: 1.2 }, cordee: { r: 4, dmg: 1.15, armor: 0.1 }, chain: { window: 1.2, heal: 0.5 } }`, regroupée près des autres constantes du duo.

**D2. Relève.** À la fin de la relève, le héros qui a relevé (le premier allié debout à moins de 1,8 unité) reçoit `nextCrit = true` ; une onde `L.blasts` de rayon `DUO.revive.radius` et de dégâts `dmgOf(helper) × DUO.revive.dmg` est ajoutée, et chaque monstre de la zone (hors gardien) passe par `stunEnemy(e, helper)`, qui les repousse. Le gardien reçoit seulement l'onde. *Alternative écartée* : raccourcir la relève, qui ne fait pas un moment.

**D3. Cordée calculée à chaque image.** `updateCordee()` pose `h.cordee` pour chaque héros (deux héros debout et distance ≤ `DUO.cordee.r`, sinon faux, toujours faux en solo). `dmgOf` multiplie par `DUO.cordee.dmg` ; `hurtPlayer` ajoute `DUO.cordee.armor` à l'armure avant le plafond de 45 %. La fiche du héros porte la classe `cordee` (liseré doré), et un toast d'annonce n'apparaît qu'une fois par partie. *Alternative écartée* : un lien visuel entre les héros dans la scène, plus coûteux à rendre et à régler.

**D4. Coup double dans `killEnemy`.** Le dernier tueur et l'instant (`duoKill = { hero, t }`, remis à zéro à chaque partie) sont mémorisés quand `heroes.length > 1`. Si le tueur diffère du précédent et que `elapsed − t < DUO.chain.window`, le combo gagne un cran de plus avant le calcul des paliers, chaque héros debout regagne `DUO.chain.heal` via `heal`, et un `floatText` « Coup double ! » s'affiche. Le tueur mémorisé est remis à nul après le déclenchement, de sorte que l'enchaînement exige d'alterner.

**D5. Solo.** Chaque mécanique commence par une garde sur `heroes.length > 1`.

## Risks / Trade-offs

- [Cordée qui oblige à jouer groupés et frustre les styles à distance] → bonus modéré (15 % et 10 %), rayon de 4 unités, pas de pénalité à s'éloigner.
- [Coup double qui fait grimper le combo trop vite et déclenche la Transe plus tôt] → un seul cran par déclenchement ; réglable.
- [Onde de relève dans une salle d'embuscade qui la rend trop facile] → dégâts modestes et gardien seulement touché par l'onde.
- [Aucun test automatisé] → vérification par copie avec `window.__eval` sous Playwright Firefox, son coupé.

## Migration Plan

Aucune migration : rien n'est persisté. Retour arrière : retirer la table `DUO` et les trois accroches. Incrémenter `GAME_VERSION` (1.10.0), avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
