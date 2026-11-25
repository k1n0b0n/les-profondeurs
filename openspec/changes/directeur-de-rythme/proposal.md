# Proposal

## Why

Une courbe de difficulté unique ne peut pas convenir à la fois aux néophytes et aux experts. Régler les statistiques des monstres selon le joueur est opaque et casse la comparabilité des records ; régler le **rythme** (pression des rencontres) l'est beaucoup moins.

## What Changes

- Un **directeur de rythme** ajuste la pression à la génération et en cours d'étage : fréquence des embuscades, moment d'arrivée des élites, générosité des potions (déjà amorcée en 1.5.0).
- Il se base sur la note d'étage (`note-par-etage`), les morts et la vie restante, jamais sur les PV ou dégâts des monstres.
- Un héros en difficulté reçoit moins d'embuscades d'affilée ; un héros dominant voit les salles se remplir plus vite et les élites arriver plus tôt.
- En duo, le directeur considère l'équipe entière (le plus faible compte autant que le plus fort).
- Un réglage facultatif **Récit** dans les options réduit la pression de façon fixe, pour l'accessibilité ; il est annoncé dans le bilan et n'altère pas les fenêtres d'esquive et de parade.
- Les valeurs sont regroupées dans une table de constantes réglables, documentée dans le README.

Hors périmètre : paliers de difficulté en menu, modification des PV et dégâts, fenêtres de parade.

## Capabilities

### New Capabilities
- `directeur-de-rythme`: ajustement dynamique de la pression des rencontres selon la maîtrise observée.
- `mode-recit`: réglage d'accessibilité réduisant la pression de façon fixe.

### Modified Capabilities

## Impact

- `index.html` : `populate`, embuscades, tirage des élites, `spawnPotion`, options et pause.
- `README.md` (« Réglages d'équilibrage »), `CHANGELOG.md`, `GAME_VERSION`.
- Dépend de `note-par-etage`. À réaliser en dernier : c'est le changement le plus opaque et le plus coûteux à régler.
