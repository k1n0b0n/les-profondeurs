# Changelog

Version affichée sur l'écran de démarrage et dans la pause (`GAME_VERSION` dans `index.html`). Ce fichier reflète le tableau `CHANGELOG` d'`index.html`, lu par la tuile Nouveautés de l'accueil : modifier les deux ensemble. Semver : majeur = refonte, mineur = fonctionnalités, correctif = corrections.

## 1.14.0 — 2026-11-27

- Jouer en ligne depuis l'accueil, à côté de « Jouer à deux sur cet écran » : l'hôte crée un salon et obtient un code de 4 caractères, ses amis le tapent pour rejoindre.
- Chacun joue dans son navigateur, avec sa propre caméra et son interface : plus de partage d'écran. L'hôte envoie l'état de la partie (héros, ennemis, projectiles, butin, pièges, portes).
- Les amis choisissent leur héros dans un salon, voient les joueurs présents, et leur héros réagit tout de suite à leurs commandes malgré la latence.
- Les choix d'aptitude, l'autel, le marchand et la fin de partie s'affichent chez le joueur concerné ; sons, messages et effets de l'hôte sont rejoués chez les amis.
- Un relais de mise en relation remplace les liens et les codes à copier ; il ne voit jamais la partie.

## 1.12.0 — 2026-11-26

- Jusqu'à quatre joueurs sur le même écran : clavier gauche, clavier droit et autant de manettes que branchées. La partie démarre dès deux joueurs prêts.
- Quatre couleurs de joueur, quatre fiches (J1 et J2 en haut, J3 et J4 en bas), une torche par héros.
- Laisse, caméra, relève et cordée fonctionnent à quatre ; les monstres gagnent 30 % de PV (60 % pour un gardien) par joueur en plus.

## 1.11.0 — 2026-11-26

- Deux nouveaux héros : Le Gardien (mêlée, 130 PV, sa parade parfaite libère une onde qui étourdit) et Le Mage (distance, 85 PV, orbes explosifs, chaque victime soigne les alliés proches).
- Les aptitudes d'épée et d'arbalète s'appliquent à toute la famille (mêlée ou distance).
- Quatre cartes de héros à l'accueil, et quatre classes à choisir dans le salon du duo.

## 1.10.0 — 2026-11-26

- Duo : relève en élan. Quand un allié est relevé, une onde de choc repousse et étourdit les monstres autour de lui, et ton prochain coup est critique.
- Duo : cordée. À moins de quatre unités l'un de l'autre, vous infligez 15 % de dégâts en plus et en subissez 10 % de moins (liseré doré sur les fiches).
- Duo : coup double. Alterner les victimes à moins de 1,2 s ajoute un cran de combo et rend 5 PV à chacun.

## 1.9.0 — 2026-11-26

- Directeur de rythme : dès l'étage 4, le nombre de monstres, d'élites et d'embuscades et la générosité en potions suivent ta note de l'étage précédent et les héros tombés.
- Les PV, dégâts et vitesse des monstres ne changent pas ; les étages 1 et 2 et les gardiens ne sont jamais ajustés.
- Mode Récit (accueil et pause) : pression toujours au minimum, sans toucher aux fenêtres d'esquive et de parade. La partie ne compte pas pour le record.

## 1.8.0 — 2026-11-26

- Note d'étage : S, A, B ou C selon les dégâts subis, les esquives et parades parfaites, le combo et le temps.
- La note s'affiche à l'escalier (par héros et pour l'équipe en duo), se résume dans la pause et les bilans de fin.
- Elle est purement informative : rien ne change dans le jeu.

## 1.7.0 — 2026-11-26

- Pactes en jeu : avant chaque gardien, l'écran de l'escalier propose un pacte (Hordes, Acier, Fureur ou Hâte), disponible dès la première partie.
- Un pacte pris dure jusqu'à l'offre suivante et rapporte, à la chute du gardien, une seconde relique légendaire à chaque héros.
- Les pactes de départ de l'accueil restent, et se cumulent avec le pacte pris en jeu pour le record.

## 1.6.0 — 2026-11-25

- Étages 1 et 2 pensés pour apprendre : l'esquive d'abord, puis la parade et l'enchaînement des victimes.
- Un indice discret nomme la commande à utiliser (clavier, manette ou tactile) et disparaît dès que la mécanique est réussie.
- À l'étage 2, ni sorcier, ni artificier, ni chaman, ni brute : des gardes et des rôdeurs en groupe, pour parer et enchaîner.

## 1.5.0 — 2026-11-19

- Salle nettoyée : vider une salle de combat rapporte des écus, un cœur à chaque héros et parfois une potion.
- Plus de potions lâchées quand la vie est basse.

## 1.4.1 — 2026-11-19

- Un coup direct coupe le monstre dans son élan : préparation, charge ou frappe annulées, bref étourdissement.

## 1.4.0 — 2026-11-19

- Multi-kills : Double, Triple, Massacre… avec écus et secousse à chaque palier.
- Chaque mort recharge un peu l'esquive.
- Paliers de combo récompensés : ×5 soin, ×10 potion, ×15 expérience et transe pleine, ×25 pluie d'écus.
- Transe dès ×6 au lieu de ×8, fenêtre de combo à 6 s.
- Pause de frappe plus marquée sur la mort d'une élite.

## 1.3.0 — 2026-11-19

- Équilibrage : monstres nettement plus faibles aux premiers étages, puis une montée régulière qui rejoint l'ancienne difficulté vers le fond.
- Moins de monstres et d'embuscades au départ, davantage en profondeur.
- Performances : séparation des monstres et alertes de groupe allégées, file d'apparition vidée d'un seul coup.

## 1.2.0 — 2026-11-18

- Journal des versions consultable depuis l'accueil (tuile Nouveautés, pastille tant qu'il n'a pas été lu).
- Version du jeu affichée sur l'accueil et dans la pause.

## 1.1.1 — 2026-11-18

- Zones hostiles : le gouffre gelé éteint les pouvoirs de flamme, la forge fait fondre le gel.
- Salle secrète : plus de pierres au sol, seule la fissure sur le mur reste.
- Grilles (chambre forte, embuscade, épreuve, gardien) plus épaisses et pleines : on voit qu'on ne passe pas.
- Un monstre gelé ne se retourne plus vers le joueur.

## 1.1.0 — 2026-11-18

- Coups chargés (épée et arbalète), course en maintenant Esquiver, orientation verrouillée pendant l'attaque.
- Gel court et aléatoire annulé par le feu, poison des vesses, lames emballées.
- Épreuves déclenchées à l'entrée de la salle, escalier avec confirmation.
- Musique variée, thème de pause, fanfare de gardien.
- Une disposition de touches par manette ; manette par défaut A esquive, X frappe, B pare.
- Correctifs : grille dorée enfoncée, esquive parfaite contre les pièges, gel sans coup, grenades de l'artificier.

## 1.0.0

- Version initiale publiée sur GitHub Pages.
