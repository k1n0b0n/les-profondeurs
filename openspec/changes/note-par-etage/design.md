# Design

## Context

Constats dans `index.html` :

- Les signaux existent déjà ou se déduisent des points de passage : `hurtPlayer` (dégâts réellement encaissés, après armure), `perfectDodge(p)` et `parrySuccess(p, src)` (esquive et parade parfaites), `killEnemy` (`combo.n`, `combo.best`), la boucle `updateOverlays(dt, running)` (temps de jeu actif).
- L'écran de l'escalier (`askDescend`, `menu-stairs`) est déjà en pause et sert d'unique point de passage d'un étage à l'autre (`goDown`).
- Les héros reçoivent leur état par `bodyStart`, remis à zéro à chaque partie ; `L` est reconstruit à chaque étage.
- La partie se reprend par `snapshot` / `newRun(saved)`. Le bilan final vit dans `win-lead` et `dead-lead` ; la pause affiche des puces (`renderRunChips`).

## Goals / Non-Goals

**Goals:**
- Une note lisible, calculée une seule fois par étage, réutilisable par un autre système (`lastGrade`).
- Aucune charge visuelle ajoutée au jeu : l'information vit dans des écrans déjà ouverts.

**Non-Goals:**
- Aucun effet sur le jeu, aucun classement en ligne, aucune écriture de la note dans le record.

## Decisions

**D1. Collecte par compteurs d'étage.** Chaque héros porte `h.fl = { dmg, perfect }` et `L.fl = { time, combo, kills }`, remis à zéro dans `startFloor`. `hurtPlayer` ajoute les dégâts encaissés, `perfectDodge` et `parrySuccess` incrémentent `perfect`, `killEnemy` met à jour `combo` et `kills`, `updateOverlays` additionne le temps quand `running` et `state === 'play'`. *Alternative écartée* : relire des totaux globaux et différencier à la descente, plus fragile.

**D2. Normalisation par signal.** `dégâts = 1 − min(1, perdu / (PV max × 1,2))`, `parfaites = min(1, compte / max(2, victimes × 0,25))`, `combo = min(1, combo max / 10)`, `temps = 1` jusqu'à la référence puis décroît linéairement jusqu'à 0 à 2,5 fois la référence, la référence valant `max(60, salles × 22)` secondes. Poids 0,35 / 0,25 / 0,25 / 0,15 ; seuils 85 / 65 / 40. Tout est regroupé dans une table `GRADE`, réglable.

**D3. Calcul à la demande, enregistrement à la descente.** `gradeOf(h)` renvoie score et lettre ; l'écran de l'escalier l'appelle à chaque ouverture (note courante), `goDown` l'enregistre dans `run.grades` (`{ depth, team, heroes }`). Une note n'existe donc que pour les étages quittés.

**D4. Affichage dans l'écran de l'escalier.** Un bloc `floor-grade` montre la lettre (par héros et pour l'équipe en duo) et les quatre valeurs en petit. *Alternative écartée* : un écran de bilan dédié, qui ajouterait un clic par étage.

**D5. Bilan et reprise.** `run.grades` est écrit dans `snapshot` et relu avec validation par `newRun(saved)`. Une ligne « Notes : A · S · B » complète `win-lead` et `dead-lead`, et une puce « Notes » la résume dans la pause (dernières notes seulement quand la liste est longue).

**D6. Exposition à d'autres systèmes.** `lastGrade()` renvoie la dernière entrée de `run.grades` (ou `null`) ; le directeur de rythme s'en servira, sans que la note n'ait d'effet par elle-même.

## Risks / Trade-offs

- [Seuils mal calibrés : trop de S ou de C] → table réglable ; premier playtest pour ajuster, aucun effet de jeu tant qu'ils ne sont pas stables.
- [Le temps pénalise l'exploration voulue] → poids bas (15 %) et référence large selon le nombre de salles.
- [Un duo où un seul héros subit tout] → notes par héros affichées ; l'équipe est une moyenne.
- [Aucun test automatisé] → vérification par copie avec `window.__eval` sous Playwright Firefox, son coupé.

## Migration Plan

Aucune migration : une sauvegarde sans `grades` est lue comme une liste vide. Retour arrière : retirer les compteurs et le bloc d'affichage. Incrémenter `GAME_VERSION` (1.8.0), avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
