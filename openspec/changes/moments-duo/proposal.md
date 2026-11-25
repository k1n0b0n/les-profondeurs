# Proposal

## Why

En duo, les deux héros jouent côte à côte plutôt qu'ensemble : la synergie Lame et Arbalétrière est passive, et la relève d'un allié est un simple temps d'attente. Rien n'invite à rester proches, à se relayer ni à se sauver les uns les autres de façon spectaculaire.

## What Changes

- **Relève en élan** : quand un héros est relevé, une onde de choc repousse et étourdit les monstres autour de lui, et le héros qui l'a relevé obtient un coup critique assuré. La relève devient un moment, pas une pause.
- **Cordée** : tant que les deux héros debout restent à moins de quatre unités l'un de l'autre, chacun inflige 15 % de dégâts en plus et en subit 10 % de moins. Un halo sur la fiche de chaque héros l'indique.
- **Coup double** : quand les deux héros enchaînent deux victimes à moins de 1,2 s d'intervalle, le combo gagne un cran de plus et chaque héros regagne un peu de vie. Alterner les coups fait durer l'enchaînement.
- Ces trois mécaniques n'existent qu'en duo ; le solo est inchangé.
- Les valeurs sont regroupées dans une table de constantes, documentée dans le README.

Hors périmètre : nouvelles aptitudes ou épreuves à deux rôles, nouveaux héros, multijoueur en ligne, réglage de la difficulté du duo (la mise à l'échelle des monstres à deux reste telle quelle).

## Capabilities

### New Capabilities
- `cooperation-duo`: mécaniques de coopération propres au duo local (relève en élan, cordée, coup double).

### Modified Capabilities

## Impact

- `index.html` : `updateRevives`, `dmgOf`, `hurtPlayer` (armure), `killEnemy`, boucle de mise à jour, fiches de héros (CSS), table de constantes.
- `README.md` (section « Synergie du duo », « Encaisser, tomber, se relever », constantes), `CHANGELOG.md`, `GAME_VERSION`.
