# Spec Delta

## Purpose

Adapter la pression des rencontres de chaque étage à la maîtrise observée du joueur, sans modifier les caractéristiques des monstres, pour garder le jeu accessible aux novices et exigeant pour les experts.

## ADDED Requirements

### Requirement: Pression calculée à la génération
À la génération d'un étage, le jeu SHALL calculer une pression de -1 à +1 à partir de la note de l'étage précédent (S : +1, A : +0,5, B : 0, C : -0,5). Si un héros est tombé à l'étage précédent, la pression MUST valoir au plus -0,5. Sans étage précédent noté, la pression MUST valoir 0.

#### Scenario: Notes élevées
- **WHEN** l'étage précédent a été noté S sans héros à terre
- **THEN** la pression de l'étage généré vaut +1

#### Scenario: Héros tombé
- **WHEN** l'étage précédent a été noté S mais qu'un héros est tombé à terre pendant celui-ci
- **THEN** la pression de l'étage généré vaut au plus -0,5

### Requirement: Effets sur les rencontres
La pression SHALL modifier le nombre de monstres de l'étage de 15 % par point (± 15 % au maximum), décaler de 15 points la probabilité de chaque élite tirée au hasard, ajouter une embuscade à la pression +1 dès l'étage 4 (au plus trois), en retirer une à la pression -0,5 ou moins dès l'étage 3, et décaler de 25 points par point, en sens inverse, la probabilité d'une potion d'étage. Le directeur MUST NOT modifier les PV, les dégâts ni la vitesse des monstres.

#### Scenario: Joueur en difficulté
- **WHEN** la pression d'un étage vaut -0,5
- **THEN** l'étage compte environ 7 % de monstres en moins, des élites un peu moins probables et une potion d'étage plus probable

#### Scenario: Caractéristiques des monstres
- **WHEN** la pression change d'un étage à l'autre
- **THEN** un monstre de même type et de même étage a les mêmes PV, dégâts et vitesse

### Requirement: Étages exemptés
Les étages 1 et 2 et les étages de gardien SHALL ne subir aucun ajustement du directeur, sauf par le mode Récit.

#### Scenario: Étage de gardien
- **WHEN** l'étage 6 est généré après un étage noté S
- **THEN** son contenu suit les règles habituelles, sans ajustement

### Requirement: Directeur en duo
En duo, la pression SHALL être calculée à partir du héros le moins bien noté de l'étage précédent, et un héros tombé de l'un ou l'autre compte pour l'équipe.

#### Scenario: Héros inégaux
- **WHEN** l'étage précédent a été noté S pour un héros et C pour l'autre
- **THEN** la pression est celle de la note C

### Requirement: Valeurs réglables et discrètes
Les valeurs du directeur SHALL être regroupées dans une table de constantes. Le jeu MUST NOT afficher la pression pendant la partie.

#### Scenario: Aucun indicateur
- **WHEN** la pression vaut +1
- **THEN** aucun message ni indicateur ne l'annonce
