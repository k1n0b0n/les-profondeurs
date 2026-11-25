# Spec Delta

## Purpose

Permettre à deux, trois ou quatre joueurs de partager une même partie sur le même écran, avec un affichage et des règles qui restent lisibles et équitables.

## ADDED Requirements

### Requirement: Salon de deux à quatre joueurs
Le salon SHALL accepter jusqu'à quatre joueurs, chacun rejoignant avec un appareil distinct (moitié gauche ou droite du clavier, ou une manette). La partie MUST pouvoir démarrer dès que deux joueurs au moins ont rejoint, avec exactement les joueurs présents.

#### Scenario: Trois joueurs
- **WHEN** trois joueurs rejoignent le salon et qu'un d'eux lance la partie
- **THEN** la partie démarre avec trois héros, chacun avec la classe choisie

#### Scenario: Un seul joueur
- **WHEN** un seul joueur a rejoint le salon
- **THEN** le lancement est refusé

### Requirement: Fiches et balises par joueur
Chaque héros SHALL avoir sa couleur (bleu, rouge, vert, or), sa fiche de vie et de potions (J1 et J2 en haut, J3 et J4 en bas de l'écran) et sa balise lorsqu'il est à terre.

#### Scenario: Quatre fiches
- **WHEN** une partie à quatre démarre
- **THEN** quatre fiches sont visibles, chacune à la couleur de son joueur

### Requirement: Laisse, caméra et relève à N héros
La laisse SHALL tirer tout héros qui s'éloigne de plus de 16 unités d'un autre héros debout. La caméra MUST cadrer tous les héros debout et s'éloigner avec leur écart maximal. Un héros à terre MUST être relevé par n'importe quel allié debout restant à moins de 1,8 unité de lui pendant 2,2 s.

#### Scenario: Relève par un troisième joueur
- **WHEN** un héros est à terre et que le troisième joueur se tient à côté de lui
- **THEN** il est relevé comme avec deux joueurs

#### Scenario: Écart maximal
- **WHEN** deux des quatre héros s'éloignent l'un de l'autre
- **THEN** la caméra s'éloigne selon leur écart et la laisse les ramène au-delà de 16 unités

### Requirement: Échelle des monstres selon le nombre de joueurs
Les monstres SHALL avoir 30 % de PV en plus par joueur supplémentaire, et les gardiens de biome 60 % en plus. Pour deux joueurs, les valeurs MUST rester identiques à celles du jeu à deux.

#### Scenario: Quatre joueurs
- **WHEN** un monstre apparaît dans une partie à quatre
- **THEN** ses PV valent 1,9 fois ceux du solo, et ceux d'un gardien 2,8 fois

### Requirement: Cordée par héros
Un héros SHALL être en cordée tant qu'au moins un allié debout est à moins de quatre unités de lui. Son état MUST être indiqué sur sa fiche.

#### Scenario: Groupes séparés
- **WHEN** deux héros sont proches l'un de l'autre et que les deux autres sont loin d'eux mais proches entre eux
- **THEN** les quatre héros sont en cordée

#### Scenario: Héros isolé
- **WHEN** un héros n'a aucun allié debout à moins de quatre unités
- **THEN** il n'est pas en cordée
