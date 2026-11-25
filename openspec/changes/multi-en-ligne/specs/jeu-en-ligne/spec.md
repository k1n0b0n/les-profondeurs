# Spec Delta

## Purpose

Permettre de jouer à distance avec des amis sans serveur de jeu : l'hôte exécute la partie, les amis voient son écran et envoient leurs commandes.

## ADDED Requirements

### Requirement: Hébergement et invitation
Depuis le salon, l'hôte SHALL pouvoir ouvrir l'écran « Jouer en ligne », partager son écran de jeu, puis générer une invitation par ami sous la forme d'un lien. L'invitation MUST fonctionner sans serveur de jeu ni compte.

#### Scenario: Générer une invitation
- **WHEN** l'hôte a partagé son écran et demande une invitation
- **THEN** un lien est affiché avec un bouton pour le copier

#### Scenario: Partage refusé
- **WHEN** l'hôte refuse le partage d'écran
- **THEN** le jeu propose de continuer avec le flux du canevas de jeu seul, sans l'interface, en le signalant

### Requirement: Rejoindre par un lien
Un ami qui ouvre un lien d'invitation SHALL voir un écran « Rejoindre » sans démarrer de partie locale. Après avoir confirmé, il MUST obtenir un code de réponse à renvoyer à l'hôte, et la connexion MUST s'établir quand l'hôte l'a saisi.

#### Scenario: Échange de codes
- **WHEN** l'ami confirme et envoie son code, puis l'hôte le saisit
- **THEN** la connexion s'établit et l'ami voit l'écran de l'hôte

#### Scenario: Lien invalide
- **WHEN** le lien est tronqué ou périmé
- **THEN** un message l'indique et aucune connexion n'est tentée

### Requirement: Manette virtuelle
Chaque ami connecté SHALL apparaître côté hôte comme une manette standard supplémentaire, rejoignant le salon, jouant et pilotant les menus comme un joueur local. Les commandes MUST provenir de sa manette ou, à défaut, de son clavier.

#### Scenario: Rejoindre le salon
- **WHEN** un ami connecté appuie sur sa touche de validation dans le salon
- **THEN** il occupe un emplacement de joueur, comme avec une manette locale

#### Scenario: Jouer
- **WHEN** l'ami déplace son personnage et attaque
- **THEN** son héros se déplace et frappe chez l'hôte comme avec une manette locale

#### Scenario: Menus
- **WHEN** un héros distant gagne un niveau
- **THEN** il choisit son aptitude avec ses commandes, et l'écran de choix lui appartient

### Requirement: Vue de l'ami
L'ami SHALL voir en plein écran le flux de l'hôte, la latence mesurée et l'aide de ses commandes, et pouvoir quitter à tout moment. Il MUST NOT pouvoir mettre la partie en pause.

#### Scenario: Quitter
- **WHEN** l'ami quitte
- **THEN** la connexion se ferme et son héros cesse de recevoir des commandes chez l'hôte

### Requirement: Déconnexion
Quand la connexion d'un ami tombe, l'hôte SHALL en être informé et la partie MUST continuer sans erreur ; le héros concerné reste immobile.

#### Scenario: Ami déconnecté en partie
- **WHEN** la connexion d'un ami est perdue
- **THEN** l'hôte voit un message, la partie continue et le héros reste sur place

### Requirement: Limites de joueurs
Le nombre total de joueurs, locaux et distants, SHALL rester au plus quatre.

#### Scenario: Salon plein
- **WHEN** quatre joueurs ont rejoint le salon
- **THEN** une cinquième connexion ne reçoit pas d'emplacement
