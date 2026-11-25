# Spec Delta

## Purpose

Offrir quatre classes de héros réparties en deux familles d'attaque, avec des forces et des signatures distinctes, jouables en solo comme en duo.

## ADDED Requirements

### Requirement: Quatre classes en deux familles
Le jeu SHALL proposer quatre classes : La Lame et Le Gardien (famille mêlée), L'Arbalétrière et Le Mage (famille distance). Une classe MUST utiliser le moteur d'attaque, l'animation et les aptitudes réservées de sa famille.

#### Scenario: Choix à l'accueil
- **WHEN** le joueur ouvre l'accueil
- **THEN** quatre cartes de héros sont proposées et le choix est mémorisé

#### Scenario: Famille mêlée
- **WHEN** un Gardien attaque
- **THEN** il frappe en arc comme La Lame et peut recevoir les aptitudes d'épée

#### Scenario: Famille distance
- **WHEN** un Mage attaque
- **THEN** il tire des projectiles comme L'Arbalétrière et peut recevoir les aptitudes d'arbalète

### Requirement: Modificateurs du Gardien
Le Gardien SHALL démarrer avec 13 unités de vie (130 PV), des attaques 20 % plus lentes, 10 % d'armure supplémentaire et une vitesse réduite de 5 %. Une parade parfaite du Gardien MUST libérer une onde de rayon 2,6 qui repousse et étourdit les monstres proches (hors gardiens de biome, seulement touchés).

#### Scenario: Départ
- **WHEN** une partie démarre avec un Gardien
- **THEN** ses PV maximaux valent 130 et ses PV courants sont pleins

#### Scenario: Parade parfaite
- **WHEN** un Gardien réussit une parade parfaite avec des monstres autour de lui
- **THEN** une onde repousse et étourdit ces monstres

### Requirement: Modificateurs du Mage
Le Mage SHALL démarrer avec 8,5 unités de vie (85 PV) et des tirs 20 % plus lents. Ses orbes MUST exploser à l'impact en infligeant 60 % des dégâts dans un rayon de 1,5, et chaque monstre qu'il abat MUST soigner de 3 PV chaque héros debout à moins de quatre unités de lui, lui compris.

#### Scenario: Explosion
- **WHEN** l'orbe d'un Mage touche un monstre entouré d'autres monstres
- **THEN** les monstres voisins subissent 60 % des dégâts

#### Scenario: Lueur
- **WHEN** un Mage abat un monstre alors qu'un allié blessé est à trois unités
- **THEN** le Mage et cet allié regagnent 3 PV

### Requirement: Classes en duo
Le salon du duo SHALL permettre à chaque joueur de choisir l'une des quatre classes, y compris la même que son partenaire.

#### Scenario: Deux Gardiens
- **WHEN** les deux joueurs choisissent Le Gardien
- **THEN** la partie démarre avec deux Gardiens
