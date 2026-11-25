# Spec Delta

## Purpose

Permettre aux joueurs de s'imposer un surcroît de difficulté volontaire avant chaque gardien, en échange d'une récompense annoncée, sans passer par un réglage de menu ni attendre une première victoire.

## ADDED Requirements

### Requirement: Offre d'un pacte avant un gardien
Quand les héros prennent l'escalier vers un étage de gardien, l'écran de confirmation de la descente SHALL proposer un pacte tiré au hasard parmi Hordes, Acier, Fureur et Hâte, en indiquant son effet et sa récompense. Le pacte proposé MUST NOT être déjà actif.

#### Scenario: Escalier vers l'étage 3
- **WHEN** les héros confirment la descente de l'étage 2 vers l'étage 3 dès leur première partie
- **THEN** l'écran propose un pacte avec son effet et la récompense « seconde relique légendaire à la chute du gardien »

#### Scenario: Escalier vers un étage ordinaire
- **WHEN** les héros prennent l'escalier de l'étage 3 vers l'étage 4
- **THEN** aucun pacte n'est proposé

#### Scenario: Pacte déjà actif
- **WHEN** le pacte de départ Acier est actif et que l'offre est tirée
- **THEN** le pacte proposé n'est pas Acier

### Requirement: Refus par défaut
Prendre le pacte proposé SHALL être un choix explicite : la descente sans action supplémentaire MUST se faire sans pacte. Un joueur MUST pouvoir changer d'avis tant qu'il n'a pas confirmé la descente.

#### Scenario: Descente sans pacte
- **WHEN** le joueur confirme la descente sans avoir pris le pacte proposé
- **THEN** aucun pacte n'est activé et aucune récompense n'est promise

#### Scenario: Changement d'avis
- **WHEN** le joueur prend le pacte puis le reprend en main avant de confirmer
- **THEN** le pacte est de nouveau refusé

### Requirement: Durée d'effet du pacte
Un pacte pris SHALL s'appliquer à l'étage du gardien et à tous les étages suivants, jusqu'à la prochaine offre incluse. À la prochaine offre, un pacte pris MUST remplacer le précédent, et une offre refusée MUST mettre fin au pacte en cours.

#### Scenario: Pacte actif sur les étages suivants
- **WHEN** un pacte est pris à la descente vers l'étage 3
- **THEN** il s'applique aux monstres des étages 3, 4 et 5

#### Scenario: Remplacement
- **WHEN** un pacte est actif et que le joueur en prend un autre à la descente vers l'étage 6
- **THEN** seul le nouveau pacte s'applique à partir de l'étage 6

#### Scenario: Fin par refus
- **WHEN** un pacte est actif et que le joueur refuse l'offre de la descente vers l'étage 6
- **THEN** aucun pacte en jeu ne s'applique à partir de l'étage 6

### Requirement: Récompense à la chute du gardien
Quand un pacte pris à la descente vers un étage de gardien est actif et que ce gardien tombe, chaque héros SHALL recevoir un choix de relique légendaire supplémentaire, en plus du choix habituel.

#### Scenario: Gardien vaincu sous pacte
- **WHEN** le gardien de l'étage 3 tombe alors qu'un pacte a été pris à la descente vers l'étage 3
- **THEN** chaque héros a deux choix de relique à faire

#### Scenario: Pacte pris plus tôt
- **WHEN** le gardien de l'étage 6 tombe et que le pacte actif vient de l'offre précédente, refusée à la descente vers l'étage 6
- **THEN** aucun choix supplémentaire n'est donné

### Requirement: Cumul avec les pactes de départ
Les pactes de départ choisis à l'accueil SHALL rester actifs toute la partie et se cumuler avec le pacte pris en jeu. Le nombre de pactes pris en jeu MUST s'ajouter à celui des pactes de départ pour le classement du record et le bilan de victoire.

#### Scenario: Victoire sous deux pactes
- **WHEN** une partie démarrée avec un pacte de départ est gagnée après avoir pris un pacte en jeu
- **THEN** le bilan et le record comptent deux pactes

#### Scenario: Mode test
- **WHEN** une partie du mode test est lancée
- **THEN** son résultat ne compte pas pour le record, comme avant

### Requirement: Décision en duo
En duo, la décision de prendre le pacte SHALL revenir au héros qui a ouvert l'écran de l'escalier. Le pacte MUST s'appliquer aux deux héros et la récompense MUST être donnée à chacun.

#### Scenario: Pacte pris en duo
- **WHEN** le second héros ouvre l'escalier et prend le pacte
- **THEN** les monstres subissent le pacte pour les deux héros, et à la chute du gardien chacun a deux choix de relique

### Requirement: Pacte visible et conservé
Le pacte actif SHALL être annoncé à l'arrivée sur l'étage du gardien et rappelé dans l'écran de pause. Il MUST être conservé quand une partie est reprise après un rechargement de la page.

#### Scenario: Annonce
- **WHEN** les héros arrivent sur l'étage d'un gardien après avoir pris un pacte
- **THEN** un message nomme le pacte actif

#### Scenario: Reprise de partie
- **WHEN** la page est rechargée en cours de partie sous pacte
- **THEN** le pacte actif et le nombre de pactes pris sont restaurés
