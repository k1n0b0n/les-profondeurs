# Spec Delta

## Purpose

Faire découvrir aux joueurs les mécaniques de combat une par une pendant les premiers étages, grâce à la composition des monstres et à des indices discrets, sans tutoriel séparé ni obstacle pour les joueurs expérimentés.

## ADDED Requirements

### Requirement: Une mécanique introduite par étage d'initiation
Le jeu SHALL associer à chaque étage d'initiation une mécanique de combat à découvrir : l'esquive à l'étage 1, la parade et l'enchaînement de victimes (combo) à l'étage 2. L'étage 3, gardé par le premier boss, MUST n'introduire aucune nouvelle mécanique.

#### Scenario: Première partie, étage 1
- **WHEN** un joueur arrive à l'étage 1 d'une partie normale
- **THEN** la mécanique à découvrir est l'esquive et aucune autre mécanique n'est mise en avant

#### Scenario: Étage du gardien
- **WHEN** un joueur arrive à l'étage 3
- **THEN** aucun indice de nouvelle mécanique n'est affiché

### Requirement: Composition des monstres des étages d'initiation
Les monstres des étages 1 et 2 SHALL se limiter aux types dont la menace relève des mécaniques déjà enseignées. L'étage 1 MUST ne contenir que des monstres de contact annoncés par une préparation visible. L'étage 2 MUST ajouter des monstres au corps à corps et MUST NOT contenir de monstre à projectiles ou à zones (sorcier, artificier, chaman) ni de brute.

#### Scenario: Monstres de l'étage 2
- **WHEN** l'étage 2 est généré
- **THEN** aucun sorcier, artificier, chaman ni brute n'y apparaît, et les rencontres comptent au moins une pièce de trois monstres ou plus

#### Scenario: Étages suivants inchangés
- **WHEN** l'étage 3 ou un étage plus profond est généré
- **THEN** la composition suit les règles de tirage habituelles du jeu

### Requirement: Indice d'entrée d'étage
Quand le joueur entre dans un étage d'initiation dont la mécanique n'est pas encore apprise, le jeu SHALL afficher un indice bref nommant la mécanique et la commande à utiliser. L'indice MUST être non bloquant : le monde continue de tourner, aucun écran ne s'ouvre et la partie ne se met pas en pause.

#### Scenario: Indice affiché à l'arrivée
- **WHEN** un joueur qui n'a jamais réussi une esquive arrive à l'étage 1
- **THEN** un indice indique d'esquiver et nomme la commande, puis disparaît seul après quelques secondes

#### Scenario: Mécanique déjà apprise
- **WHEN** un joueur qui a déjà réussi une esquive arrive à l'étage 1 d'une nouvelle partie
- **THEN** aucun indice d'esquive n'est affiché

### Requirement: Commande adaptée à l'appareil
Le texte de l'indice SHALL nommer la commande réellement associée à l'action sur l'appareil du joueur (touche personnalisée, bouton de manette, bouton tactile).

#### Scenario: Touche personnalisée
- **WHEN** le joueur a réaffecté l'esquive à une autre touche et qu'un indice d'esquive s'affiche
- **THEN** l'indice nomme cette touche

#### Scenario: Écran tactile
- **WHEN** un indice s'affiche sur un écran tactile
- **THEN** il désigne le bouton à l'écran correspondant

### Requirement: Mécanique apprise après une réussite
Une mécanique SHALL être considérée comme apprise dès que le joueur l'a réussie une fois (esquive qui évite un coup, parade parfaite, combo de deux victimes ou plus). L'état appris MUST être conservé entre les parties et MUST disparaître avec les données du jeu du navigateur.

#### Scenario: Réussite en cours d'indice
- **WHEN** un joueur réussit une esquive alors que l'indice d'esquive est affiché
- **THEN** l'indice disparaît et la mécanique est marquée apprise pour les parties suivantes

#### Scenario: Données du navigateur indisponibles
- **WHEN** le stockage local est inaccessible
- **THEN** le jeu fonctionne normalement et les indices se comportent comme pour un joueur qui n'a rien appris

### Requirement: Rappel après des coups encaissés
Si un joueur encaisse trois coups consécutifs sans utiliser la mécanique de l'étage, le jeu SHALL réafficher l'indice une seule fois par étage.

#### Scenario: Joueur en difficulté
- **WHEN** un joueur n'a pas appris l'esquive et encaisse trois coups de suite sans esquiver à l'étage 1
- **THEN** l'indice d'esquive est réaffiché une fois

#### Scenario: Rappel déjà donné
- **WHEN** l'indice a déjà été réaffiché à cet étage
- **THEN** aucun nouveau rappel n'est affiché avant l'étage suivant

### Requirement: Apprentissage par héros en duo
En duo, la réussite d'une mécanique SHALL être suivie par héros pendant la partie, et l'état conservé entre les parties l'est pour l'appareil (aucun héros n'a d'identité persistante). L'indice MUST nommer la commande de chaque héros qui n'a pas encore réussi la mécanique, et MUST disparaître quand tous l'ont réussie.

#### Scenario: Un héros réussit avant l'autre
- **WHEN** deux joueurs sont à l'étage 1 d'une première partie et le premier réussit une esquive pendant que l'indice est affiché
- **THEN** l'indice ne nomme plus que la commande du second héros

#### Scenario: Les deux héros ont réussi
- **WHEN** les deux héros ont réussi l'esquive
- **THEN** l'indice disparaît et l'état appris est conservé pour les parties suivantes
