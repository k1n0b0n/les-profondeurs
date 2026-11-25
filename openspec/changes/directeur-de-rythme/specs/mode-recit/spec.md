# Spec Delta

## Purpose

Offrir un réglage d'accessibilité qui adoucit durablement la pression des rencontres, pour les joueurs qui veulent profiter du jeu sans enjeu de classement.

## ADDED Requirements

### Requirement: Réglage Récit
Le jeu SHALL proposer un réglage « Récit » (Oui ou Non) dans les réglages de l'accueil et dans la pause, désactivé par défaut et mémorisé entre les parties. Activé, il MUST fixer la pression de tous les étages à -1, quelles que soient les notes.

#### Scenario: Récit activé
- **WHEN** le réglage est activé et qu'un étage est généré après un étage noté S
- **THEN** la pression de l'étage vaut -1

#### Scenario: Réglage mémorisé
- **WHEN** le joueur active Récit puis recharge la page
- **THEN** le réglage est toujours activé

### Requirement: Récit sans effet sur la précision
Le mode Récit SHALL ne modifier ni les fenêtres d'esquive et de parade parfaites, ni les PV, dégâts et vitesse des monstres.

#### Scenario: Fenêtres inchangées
- **WHEN** Récit est activé
- **THEN** les fenêtres d'esquive et de parade parfaites sont celles du jeu normal

### Requirement: Récit hors classement
Une partie où Récit a été actif lors de la génération d'au moins un étage SHALL ne pas être enregistrée comme record, et ses bilans MUST l'indiquer.

#### Scenario: Victoire en Récit
- **WHEN** une partie est gagnée avec Récit activé
- **THEN** le record n'est pas modifié et l'écran de fin mentionne le mode Récit

#### Scenario: Reprise de partie
- **WHEN** la page est rechargée en cours de partie jouée en Récit
- **THEN** la partie reste hors classement
