# Design

## Context

Les classes sont aujourd'hui binaires : `CLASSES` ne contient que `lame` et `arbalete`, et huit branches comparent `cls === 'arbalete'` pour choisir le moteur d'attaque (mêlée ou tir), l'animation, l'icône du bouton et la visée automatique. Les aptitudes réservées portent `cls: 'lame'` ou `cls: 'arbalete'` et sont filtrées par égalité avec `who.cls`. Les statistiques de départ viennent de `heroStats()` appliqué dans `makeHero` et à chaque `newRun`.

## Goals / Non-Goals

**Goals:** ajouter deux classes en réutilisant les deux moteurs d'attaque existants ; garder le code lisible en introduisant la notion de famille.

**Non-Goals:** pas de nouveau moteur d'attaque, pas d'aptitudes propres aux nouvelles classes.

## Decisions

**D1. Famille plutôt que classe pour le moteur.** `CLASSES[id].family` vaut `melee` ou `ranged` ; `isRanged(x)` remplace les huit tests `=== 'arbalete'` de comportement. Les synergies explicitement nommées (« Lame + Arbalétrière », `teamHas('lame')`) restent liées à la classe.

**D2. Modificateurs déclaratifs.** `CLASSES[id].mods` (PV max absolu, facteurs `atkCdMul`, `dmgMul`, `speedMul`, additifs `armor`) est appliqué par `applyClassMods(h)` après `heroStats()` dans `makeHero` et dans `newRun`.

**D3. Signatures en trois accroches.** Rempart dans `parrySuccess` (onde `L.blasts` + `stunEnemy`, comme la relève), Éclat dans `boltHit` (onde à 60 % des dégâts du projectile), Lueur dans `killEnemy` (soin des héros proches). Chaque accroche commence par une garde sur la classe.

**D4. Aptitudes par famille.** Le filtre de `rollPerks` compare la famille quand l'aptitude porte `cls: 'lame'` ou `'arbalete'`, et la classe exacte sinon.

**D5. Apparence.** Le modèle existant sert aux deux familles ; chaque classe applique une teinte de tunique (mélange de 40 % avec une couleur de classe, depuis la couleur d'origine mémorisée) et un facteur d'échelle (Gardien 1,12, Mage 0,95). Le liseré de joueur conserve l'identification J1, J2.

## Risks / Trade-offs

- [Le Mage dépasse l'Arbalétrière en zone] → cadence plus lente, PV plus bas, dégâts d'explosion à 60 %.
- [Le Gardien trop lent en solo] → armure et PV compensent ; valeurs dans `CLASSES`.
- [Aucun test automatisé] → vérification sous Playwright Firefox, son coupé.

## Migration Plan

Aucune migration : les sauvegardes ne connaissent que `lame` et `arbalete`, toujours valides. Version 1.11.0, avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
