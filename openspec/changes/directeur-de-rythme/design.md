# Design

## Context

Constats dans `index.html` :

- La densité de chaque étage se décide dans `populate(dun)` : `total` de monstres (formule en profondeur, pacte Hordes), `ambushRooms` (1 salle dès l'étage 2, 2 dès l'étage 5), le nombre d'élites (une expression par tranche de profondeur) et une potion d'étage à 40 %. Les étages 1 et 2 ont une composition fixée par `ONBOARDING`, les étages de gardien un total réduit.
- Les notes viennent de `note-par-etage` : `run.grades` (équipe et héros), `lastGrade()`, `teamGrade()`. Le jeu connaît l'événement « héros à terre » en duo (`p.down = true`).
- Le réglage d'attaque auto est un modèle de réglage booléen : clé `profondeurs.*`, ligne `Oui/Non` dans l'accueil, bouton rapide dans la pause, `setQuick`.
- `recordBest()` écrit le record ; `snapshot` / `newRun(saved)` gèrent la reprise de partie.

## Goals / Non-Goals

**Goals:**
- Une pression simple à raisonner (une valeur de -1 à +1) appliquée en un seul endroit.
- Aucun effet sur les caractéristiques des monstres, donc des records comparables.

**Non-Goals:**
- Pas d'ajustement en cours d'étage, pas d'indicateur de pression, pas de paliers de difficulté en menu.

## Decisions

**D1. Une fonction, une valeur.** `directorPressure(depth)` renvoie la pression : -1 si Récit, 0 aux étages 1, 2 et de gardien, sinon `DIRECTOR.pressure[lettre]` où la lettre est la plus basse des notes des héros de la dernière entrée de `run.grades` (équipe en solo), plafonnée à `DIRECTOR.downCap` si un héros est tombé (`downs` de cette entrée). Appelée une fois au début de `populate`, résultat stocké dans `L.pressure`.

**D2. Effets appliqués dans `populate`.** `total *= 1 + DIRECTOR.count × p`. Le nombre d'embuscades suit `DIRECTOR.ambushUp` (p ≥ 1 et étage ≥ 4, plafond 3) et `DIRECTOR.ambushDown` (p ≤ -0,5 et étage ≥ 3, plancher 0). Chaque probabilité d'élite tirée au hasard passe par `clamp(base + DIRECTOR.elite × p, 0, 1)`, les élites garanties de l'étage 7 et plus restant intactes. La potion d'étage passe de 0,4 à `clamp(0,4 − DIRECTOR.potion × p, 0, 1)`. *Alternative écartée* : agir sur `hpScale` / `dmgScale`, qui rendrait les records incomparables.

**D3. Héros à terre.** `L.fl.downs` est incrémenté à l'événement « à terre » ; `goDown` l'écrit dans l'entrée de `run.grades` (`downs`), avec validation à la reprise. Le plafond vaut pour l'équipe entière.

**D4. Récit comme réglage booléen cloné d'attaque auto.** Clé `profondeurs.recit`, ligne `Oui/Non` dans `settings-start`, bouton rapide `recit-pause` dans la pause, état `recit`. `run.recit` passe à vrai dès qu'un étage est généré en Récit, est sauvegardé dans `snapshot`, et empêche `recordBest` d'écrire. Les bilans ajoutent « Mode Récit ». *Alternative écartée* : réduire aussi les PV ou élargir les fenêtres, contre la décision de ne pas toucher à la sensation de jeu.

**D5. Table réglable.** `DIRECTOR = { pressure: { S: 1, A: 0.5, B: 0, C: -0.5 }, downCap: -0.5, count: 0.15, elite: 0.15, potion: 0.25, ambushUpFrom: 4, ambushDownFrom: 3 }`, documentée dans le README.

## Risks / Trade-offs

- [Notes mal calibrées qui poussent la pression au maximum] → effets bornés (± 15 %) et table réglable ; le directeur ne touche pas aux statistiques.
- [Pression invisible donc difficile à diagnostiquer] → `L.pressure` accessible à la console, valeur documentée.
- [Récit utilisé par erreur et record perdu] → bilan explicite et réglage clairement nommé dans la pause.
- [Aucun test automatisé] → vérification par copie avec `window.__eval` sous Playwright Firefox, son coupé.

## Migration Plan

Aucune migration : `recit`, `downs` et `run.recit` absents des anciennes sauvegardes valent faux ou zéro. Retour arrière : retirer `directorPressure` et le réglage. Incrémenter `GAME_VERSION` (1.9.0), avec `CHANGELOG` d'`index.html` et `CHANGELOG.md`.
