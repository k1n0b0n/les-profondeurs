# Design

## Context

Le moteur est déjà majoritairement générique en `heroes.length` (menus par propriétaire, relève, bourse, notes, coup double), mais plusieurs endroits supposent au plus deux héros : le singleton `heroTwo` et la lumière `torchLight2`, les fiches `pcard-1/2` et balises `down-1/2`, `P_COLOR`, les tableaux de suivi du HUD (`lastPots`, `lastEgide`, `lastStatus`), les couleurs de la minicarte, la laisse (`const [a, b] = heroes`), l'écart de caméra, `updateCordee`, l'échelle `party` des monstres et le salon à deux emplacements.

## Goals / Non-Goals

**Goals:** N de 1 à 4 héros avec le même code ; aucune régression solo et duo.

**Non-Goals:** pas de réglage fin de l'équilibrage à trois ou quatre ; pas de tactile à plusieurs.

## Decisions

**D1. Une liste de héros supplémentaires.** `heroTwo` devient `extraHeroes[]` (indices 1 à 3), créés à la demande par `makeHero(i, buildHero(couleurs[i]), torchLights[i])`. Les quatre lumières de torche sont créées au démarrage, éteintes, comme `torchLight2` aujourd'hui, pour éviter toute recompilation de shaders en cours de partie.

**D2. Interface par classes CSS.** `#hud.duo` reste pour tout jeu à plusieurs ; `pcard-3` et `pcard-4` sont posées en bas à gauche et à droite de l'écran par une classe de coin, de sorte que la grille du haut ne change pas. Les balises `down-3` et `down-4` réutilisent le code générique de `updateDownMarks`.

**D3. Laisse par paires.** Chaque paire de héros debout éloignée de plus de `LEASH` est ramenée de moitié de l'excédent chacun. Pour deux héros, le résultat est identique à l'actuel.

**D4. Caméra par écart maximal.** Le zoom se calcule avec la plus grande distance entre deux héros debout, au lieu de la distance entre les deux premiers.

**D5. Échelle des PV linéaire.** `party = 1 + 0,3 × (N − 1)` (gardien : `1 + 0,6 × (N − 1)`), égal à 1,3 et 1,6 pour deux joueurs.

**D6. Cordée par héros.** `updateCordee` pose `h.cordee` si un allié debout est à moins de `DUO.cordee.r`, et bascule la classe `cordee` de chaque fiche. Pour deux héros, le résultat est identique.

**D7. Salon à quatre emplacements.** `lobby.slots` passe à quatre entrées, les classes par défaut sont lame, arbalète, gardien, mage ; la partie démarre avec les emplacements remplis, à partir de deux. Les quatre emplacements HTML existent, les non utilisés sont masqués jusqu'à ce que le précédent soit pris.

## Risks / Trade-offs

- [Quatre lumières ponctuelles pèsent sur les petits GPU] → éteintes tant qu'inutiles et de portée courte ; le niveau de rendu adaptatif existant compense.
- [HUD encombré à quatre] → fiches de coin compactes ; la grille du haut est inchangée.
- [Parties à quatre trop faciles ou difficiles] → échelle linéaire simple, réglable.
- [Aucun test automatisé] → vérification sous Playwright Firefox, son coupé.

## Migration Plan

Aucune donnée persistée n'est modifiée. Retour arrière : retirer les emplacements 3 et 4 et la liste de héros supplémentaires. Version 1.12.0, avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
