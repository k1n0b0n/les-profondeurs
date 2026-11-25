# Spec Delta

## Purpose

Donner au duo local des moments de jeu qui récompensent la coopération active : se relever, rester groupés et enchaîner les victimes à tour de rôle.

## ADDED Requirements

### Requirement: Relève en élan
Quand un héros à terre est relevé, une onde de choc SHALL repousser les monstres situés à moins de trois unités et les étourdir, et le héros qui l'a relevé MUST obtenir un coup critique assuré. Le relevé conserve son invulnérabilité brève et ses PV de relève actuels.

#### Scenario: Relève au milieu des monstres
- **WHEN** un héros est relevé alors que des monstres se trouvent à moins de trois unités
- **THEN** ces monstres sont repoussés et étourdis, et le héros qui a relevé a son prochain coup critique

#### Scenario: Relève sans monstre
- **WHEN** un héros est relevé sans monstre à proximité
- **THEN** la relève se termine comme avant et le héros qui a relevé a tout de même son prochain coup critique

### Requirement: Cordée
Tant que les deux héros sont debout et à moins de quatre unités l'un de l'autre, chacun SHALL infliger 15 % de dégâts en plus et subir 10 % de dégâts en moins, la réduction s'ajoutant à l'armure dans la limite de réduction existante. La fiche de chaque héros MUST indiquer que la cordée est active.

#### Scenario: Héros proches
- **WHEN** les deux héros debout sont à trois unités l'un de l'autre
- **THEN** leurs dégâts infligés sont majorés de 15 %, les dégâts subis réduits de 10 %, et leurs fiches affichent la cordée

#### Scenario: Héros éloignés ou à terre
- **WHEN** les héros s'éloignent à plus de quatre unités, ou que l'un d'eux est à terre
- **THEN** la cordée cesse immédiatement

#### Scenario: Solo
- **WHEN** un seul héros joue
- **THEN** aucune cordée n'est active

### Requirement: Coup double
Quand un héros porte le coup fatal à un monstre moins de 1,2 s après que l'autre héros en a porté un, le combo SHALL gagner un cran supplémentaire et chaque héros debout MUST regagner 5 PV. Deux coups fatals du même héros ne déclenchent pas de coup double.

#### Scenario: Victimes alternées
- **WHEN** le premier héros tue un monstre puis le second en tue un 0,8 s plus tard
- **THEN** le combo gagne un cran de plus, chaque héros debout regagne 5 PV et un message « Coup double » s'affiche

#### Scenario: Même héros
- **WHEN** le même héros tue deux monstres en 0,5 s
- **THEN** aucun coup double n'est déclenché

#### Scenario: Trop lent
- **WHEN** le second héros tue un monstre 2 s après le premier
- **THEN** aucun coup double n'est déclenché

### Requirement: Solo inchangé
En solo, la relève, la cordée et le coup double SHALL ne produire aucun effet et ne rien afficher.

#### Scenario: Partie solo
- **WHEN** un héros joue seul et tue des monstres à la suite
- **THEN** le comportement est identique à celui d'avant ce changement
