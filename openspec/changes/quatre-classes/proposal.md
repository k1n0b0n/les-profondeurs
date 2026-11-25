# Proposal

## Why

Le jeu ne propose que deux héros (La Lame, L'Arbalétrière). Il y a peu de variété à choisir, et en duo une seule combinaison croisée. Deux classes de plus enrichissent la rejouabilité et préparent les parties à trois ou quatre.

## What Changes

- Deux nouvelles classes jouables : **Le Gardien** (mêlée, encaisseur) et **Le Mage** (distance, soutien). Elles complètent La Lame (mêlée) et L'Arbalétrière (distance).
- Chaque classe appartient à une **famille** (mêlée ou distance) qui détermine son moteur d'attaque, ses aptitudes de famille et son animation ; des **modificateurs de départ** et une **signature** la distinguent.
- **Gardien** : 130 % des PV, coups 20 % plus lents, armure +10 %, déplacement −5 %. Signature « Rempart » : une parade parfaite libère une onde qui repousse et étourdit les monstres proches.
- **Mage** : 85 % des PV, tirs 20 % plus lents. Signature « Éclat » : ses orbes explosent à l'impact (60 % des dégâts, rayon 1,5) ; « Lueur » : chaque victime qu'il abat soigne les alliés proches (lui compris).
- Les aptitudes réservées à une famille (épée : allonge, tourbillon, miroir ; arbalète : perforant, salve, ricochet) s'appliquent à toutes les classes de la famille.
- L'accueil (solo) et le salon duo proposent les quatre classes.

Hors périmètre : nouvelles aptitudes propres aux nouvelles classes, combos croisés supplémentaires, parties à plus de deux joueurs (changement `quatre-joueurs`).

## Capabilities

### New Capabilities
- `classes-heros`: les quatre classes, leurs familles, modificateurs et signatures.

### Modified Capabilities

## Impact

- `index.html` : `CLASSES`, `dressHero`, `setHeroClass`, `makeHero` et `newRun` (modificateurs), `autoTarget`, branches d'attaque et d'animation, filtre des aptitudes, `parrySuccess`, `boltHit`, `killEnemy`, accueil (cartes) et CSS.
- `README.md`, `CHANGELOG.md`, `GAME_VERSION`.
