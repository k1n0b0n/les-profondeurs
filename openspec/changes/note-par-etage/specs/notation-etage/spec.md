# Spec Delta

## Purpose

Mesurer la maîtrise du joueur à chaque étage par une note simple (S, A, B, C), calculée à partir de signaux déjà suivis par le jeu, pour donner un but aux joueurs expérimentés et un indicateur objectif aux autres systèmes.

## ADDED Requirements

### Requirement: Calcul de la note d'étage
Le jeu SHALL attribuer à chaque héros, pour chaque étage quitté, une note S, A, B ou C issue d'un score de 0 à 100 combinant quatre signaux : les dégâts subis (35 %), les esquives et parades parfaites (25 %), le combo maximal (25 %) et le temps passé (15 %). Chaque signal MUST être ramené à une valeur de 0 à 1 selon la taille et le contenu de l'étage. Les seuils MUST être S à 85 ou plus, A à 65, B à 40, C en dessous.

#### Scenario: Étage sans dégât ni enchaînement
- **WHEN** un héros traverse un étage sans subir de dégât, avec quelques esquives parfaites, un combo maximal de ×4 et un temps normal
- **THEN** sa note est au moins B et au plus A

#### Scenario: Étage subi
- **WHEN** un héros perd l'équivalent de plus d'une fois et demie ses PV maximaux sur un étage, sans esquive parfaite ni combo
- **THEN** sa note est C

#### Scenario: Temps long
- **WHEN** un héros passe plus de deux fois et demie le temps de référence de l'étage
- **THEN** le signal de temps vaut zéro mais les autres signaux restent comptés

### Requirement: Note purement informative
La note SHALL NOT modifier la difficulté, les récompenses, le record ni le déroulement d'une partie.

#### Scenario: Aucun effet de jeu
- **WHEN** un héros obtient la note S puis la note C sur deux étages
- **THEN** les monstres, les récompenses et le classement du record sont ceux qu'ils auraient été sans note

### Requirement: Affichage non bloquant à la descente
Le jeu SHALL afficher la note de l'étage dans l'écran de confirmation de l'escalier, avec les valeurs des signaux, sans écran ni délai supplémentaire. Le joueur MUST pouvoir l'ignorer.

#### Scenario: Note visible à l'escalier
- **WHEN** un héros ouvre l'écran de l'escalier
- **THEN** la note courante de l'étage et ses signaux sont affichés, et la descente se confirme comme avant

#### Scenario: Étage sans combat
- **WHEN** l'écran de l'escalier s'ouvre sans avoir combattu
- **THEN** une note est affichée, calculée avec les signaux disponibles

### Requirement: Notes par héros et par équipe
En duo, le jeu SHALL calculer une note par héros et une note d'équipe égale à la moyenne des scores des héros. Les signaux propres à un héros (dégâts subis, esquives et parades parfaites) MUST être mesurés pour lui seul ; le combo et le temps MUST être communs.

#### Scenario: Deux héros inégaux
- **WHEN** un héros ne subit aucun dégât et que l'autre en subit beaucoup
- **THEN** l'écran de l'escalier affiche deux notes différentes et la note d'équipe

### Requirement: Conservation et bilan
Le jeu SHALL conserver la note de chaque étage quitté pendant la partie, y compris après un rechargement, et SHALL la résumer dans l'écran de pause, de victoire et de mort.

#### Scenario: Reprise de partie
- **WHEN** la page est rechargée après trois étages
- **THEN** les trois notes sont restaurées et visibles dans la pause

#### Scenario: Bilan de fin
- **WHEN** la partie se termine à l'étage 5
- **THEN** l'écran de fin liste les notes des étages quittés
