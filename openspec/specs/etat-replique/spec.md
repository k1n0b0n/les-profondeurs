# etat-replique Specification

## Purpose

Permettre à chaque joueur en ligne de jouer avec son propre écran : le jeu tourne chez chacun pour le rendu, l'hôte simule et n'envoie que l'état utile.

## Requirements

### Requirement: Étage identique par graine
L'hôte SHALL transmettre une graine à chaque ami au début d'un étage, et chaque client MUST reconstruire le même étage (grille, décor, pièges, entités initiales) à partir de cette graine. La graine MUST ne piloter que la génération : la simulation de l'hôte et le rendu cosmétique n'en dépendent pas.

#### Scenario: Même étage chez l'hôte et l'ami
- **WHEN** l'hôte démarre un étage et l'ami reçoit la graine
- **THEN** la grille, les pièges et les entités initiales de l'ami sont identiques à ceux de l'hôte

#### Scenario: Mode local inchangé
- **WHEN** une partie locale démarre sans ami connecté
- **THEN** la génération reste aléatoire et aucune graine n'est exigée

### Requirement: Instantanés d'état
Pendant la partie, l'hôte SHALL envoyer à chaque ami des instantanés à environ 20 Hz de ses entités dynamiques (héros, ennemis, projectiles, bombes, butin, accessoires), chacune avec un identifiant stable, sur un canal de données fiable et ordonné. Le client MUST ignorer un instantané plus ancien que le dernier appliqué.

#### Scenario: Entité suivie
- **WHEN** un ennemi se déplace chez l'hôte
- **THEN** la marionnette de ce même ennemi se déplace chez l'ami, sans doublon

#### Scenario: Entité retirée
- **WHEN** un ennemi, un projectile ou un accessoire disparaît chez l'hôte
- **THEN** il disparaît chez l'ami

### Requirement: Rendu local de l'ami
Chaque ami SHALL voir la partie avec sa propre caméra et son propre HUD, rendus localement, sans flux vidéo ni partage d'écran. Les mouvements reçus MUST être interpolés pour rester fluides entre deux instantanés.

#### Scenario: Aucun partage d'écran
- **WHEN** un ami rejoint
- **THEN** aucune demande de partage d'écran n'est faite à l'hôte ni à l'ami

#### Scenario: Fluidité
- **WHEN** les instantanés arrivent à 20 Hz
- **THEN** les marionnettes se déplacent de façon continue à l'écran

### Requirement: Événements ponctuels
L'hôte SHALL envoyer les événements ponctuels (sons, toasts, effets, transitions d'écran : choix d'aptitude, boutique, autel, mort, victoire, escalier) et le client MUST les rejouer sans réexécuter la logique de jeu. Un écran appartient au joueur concerné.

#### Scenario: Choix d'aptitude à distance
- **WHEN** le héros d'un ami gagne un niveau
- **THEN** l'écran de choix s'ouvre chez cet ami, et sa sélection est appliquée chez l'hôte

#### Scenario: Son rejoué
- **WHEN** l'hôte joue un son de coup
- **THEN** l'ami entend le même son, sans doublon local

### Requirement: Prédiction locale du héros de l'ami
Le client SHALL appliquer immédiatement à son propre héros ses commandes de déplacement, à la vitesse effective de l'hôte et avec les mêmes collisions, sans attendre l'instantané. L'esquive, les coups et les parades MUST rester ceux de l'hôte. Les dégâts, les ennemis et les effets MUST rester ceux de l'hôte.

#### Scenario: Déplacement sans latence
- **WHEN** l'ami appuie sur une direction avec 150 ms de latence
- **THEN** son héros bouge à l'écran dès cette trame, sans attendre l'instantané

#### Scenario: Écran de menu
- **WHEN** la partie n'est pas en jeu (choix, boutique, pause de l'hôte)
- **THEN** aucune prédiction n'est appliquée

### Requirement: Réconciliation de la prédiction
Chaque trame de commande MUST porter un numéro et l'hôte MUST renvoyer dans ses instantanés le dernier numéro traité par héros. Le client SHALL rejouer les commandes non acquittées sur la position autoritaire reçue, corriger un petit écart progressivement, et recaler le héros d'un coup au-delà d'un seuil.

#### Scenario: Petit écart
- **WHEN** la position prédite diffère légèrement de celle de l'hôte
- **THEN** le héros est ramené vers la position de l'hôte progressivement, sans à-coup visible

#### Scenario: Grand écart
- **WHEN** le héros de l'ami est repoussé, gelé ou téléporté par l'hôte, et l'écart dépasse le seuil
- **THEN** il est recalé immédiatement sur la position de l'hôte

### Requirement: Aucun flux vidéo
Le jeu SHALL ne plus utiliser de flux vidéo ni de partage d'écran pour le jeu en ligne, et MUST NOT proposer de repli vidéo. Un hôte et un ami de versions de protocole différentes MUST être refusés avec un message.

#### Scenario: Version différente
- **WHEN** un ami rejoint un salon dont l'hôte a une autre version de protocole
- **THEN** un message l'indique et aucune partie en ligne ne démarre

### Requirement: Commandes de l'ami
Les commandes de l'ami (manette ou clavier) SHALL continuer de parvenir à l'hôte comme celles d'une manette virtuelle, et l'ami MUST NOT pouvoir mettre la partie en pause.

#### Scenario: Jouer
- **WHEN** l'ami déplace son héros et attaque
- **THEN** son héros se déplace et frappe chez l'hôte puis chez l'ami

### Requirement: Salon par code court
L'hôte SHALL obtenir un code de salon de 4 caractères en ouvrant le jeu en ligne, et un ami MUST pouvoir rejoindre en le saisissant dans un écran « Rejoindre » ou en ouvrant le jeu avec `?salon=CODE`. La mise en relation MUST passer par un relais de signalisation qui ne transmet que l'offre, la réponse et les candidats de connexion ; ensuite la partie MUST passer en direct entre les navigateurs, sans que le relais voie la partie.

#### Scenario: Rejoindre par code
- **WHEN** l'ami tape le code affiché chez l'hôte
- **THEN** la connexion s'établit sans copier-coller et l'ami apparaît chez l'hôte

#### Scenario: Code inconnu ou salon plein
- **WHEN** l'ami saisit un code inexistant, expiré ou d'un salon complet
- **THEN** un message l'indique et aucune connexion n'est tentée

#### Scenario: Relais injoignable
- **WHEN** le relais ne répond pas
- **THEN** l'hôte et l'ami voient un message, et le jeu local reste utilisable

### Requirement: Salon vu par l'ami
Un ami connecté SHALL voir un écran de salon avec le code, les quatre héros à choisir et la liste des joueurs avec leur héros, tenue à jour par l'hôte. Les amis connectés MUST être installés automatiquement dans le salon de l'hôte, et seul l'hôte MUST pouvoir lancer la partie. Au lancement, l'écran de salon de l'ami MUST laisser place à l'étage.

#### Scenario: Choisir son héros
- **WHEN** l'ami clique sur un héros ou utilise ses flèches
- **THEN** son héros change dans le salon de l'hôte et dans la liste de l'ami

#### Scenario: Seul l'hôte lance
- **WHEN** l'ami appuie sur sa touche de validation dans le salon
- **THEN** la partie ne démarre pas

### Requirement: Connexion directe et limites
Le jeu en ligne SHALL fonctionner sans serveur de jeu : le relais ne sert qu'à la mise en relation. La partie MUST accepter au plus quatre joueurs, hôte compris. La perte d'un ami MUST laisser la partie de l'hôte continuer sans erreur ; chez l'ami, un message l'indique et il peut quitter.

#### Scenario: Ami déconnecté
- **WHEN** la connexion d'un ami tombe
- **THEN** l'hôte voit un message, la partie continue, le héros reste sur place

### Requirement: Parité avec le jeu local
Le mode local (clavier, manettes, jusqu'à quatre joueurs sur un écran) MUST se comporter exactement comme avant ce changement.

#### Scenario: Partie locale
- **WHEN** on joue sans connexion en ligne
- **THEN** aucun comportement ni réglage n'a changé
