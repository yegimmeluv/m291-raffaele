# Transitions et animations · Swipeat

Ce document liste les animations du site Swipeat : où elles se trouvent, ce qui les déclenche, comment elles sont faites et à quoi elles servent.

## Principes

- **Tout est fait avec `@keyframes`**, en CSS pur, **sans aucune librairie**. Le site contient 26 `@keyframes`.
- **Le JavaScript ne calcule aucune animation** : il ajoute ou enlève une classe (par exemple `.sortie-smash`), et c'est cette classe qui lance l'animation avec la propriété `animation`.
- **Aucune propriété `transition`** n'est utilisée dans `style.css` : tout ce qui bouge passe par `@keyframes`. Les couleurs au survol changent directement, sans fondu.
- **Chaque animation a une utilité.** Elle montre ce qui vient de changer : où part une recette, où elle est rangée, qu'un champ est faux, que la page charge.
- **Courtes** : entre 0,12 s et 0,5 s, pour que l'appli reste rapide à utiliser.
- **On anime `transform` et `opacity`** : le navigateur les gère sans recalculer la mise en page, donc l'animation reste fluide, même sur un téléphone.
- **Accessibles** : si la personne a activé « Réduire les animations » dans son système, elles sont coupées (voir plus bas).

## Rappel : comment marche `@keyframes`

```css
/* 1. On décrit les étapes de l'animation */
@keyframes battement {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.45); }
  100% { transform: scale(1); }
}

/* 2. On l'applique à un élément quand il a une classe */
.smash.pop span {
  animation: battement .45s var(--rebond);
  /*         nom       durée  courbe       */
}
```

Deux réglages sont utilisés souvent :

- **`forwards`** : l'élément garde l'état de la dernière étape une fois l'animation finie. Par exemple, la carte reste invisible après s'être envolée.
- **Pas de `from`** : quand on n'écrit que `to { … }`, l'animation part de l'état actuel de l'élément. C'est ce qui permet à la carte de s'envoler **depuis l'endroit où on l'a lâchée** au doigt.

## Durées et courbes communes

Les valeurs sont rangées dans des variables CSS, au début du bloc « Animations » de `style.css` :

| Variable | Valeur | Utilisation |
|---|---|---|
| `--rapide` | `.15s` | survols et clics |
| `--moyen` | `.3s` | arrivée d'une carte |
| `--sortie` | `cubic-bezier(.2, .8, .2, 1)` | démarre vite et se pose doucement : pour ce qui **arrive** |
| `--lance` | `cubic-bezier(.5, 0, .75, 0)` | démarre lentement puis accélère : pour ce qui **part**, comme un objet qu'on lance |
| `--rebond` | `cubic-bezier(.34, 1.56, .64, 1)` | dépasse un peu sa cible puis revient : pour les petits « pop » |

## Liste des animations

| # | Élément | Déclencheur | Ce qui se passe | `@keyframes` (classe) | Durée |
|---|---|---|---|---|---|
| 1 | Carte recette | Clic sur Smash ou Passer, flèches ← →, carte lancée au doigt | La carte s'envole à gauche (smash) ou à droite (passer) en tournant et en disparaissant | `envol-gauche`, `envol-droite` (`.sortie-smash`, `.sortie-pass`) | 0,32 s |
| 2 | Carte suivante | Juste après le n° 1, ou quand on applique des filtres | La carte remonte de la pile en grandissant légèrement | `arrivee` (`.entree`) | 0,3 s |
| 2b | Pastille du prix | En même temps que le n° 2 | Le prix « tombe » sur la photo comme un tampon | `tampon` | 0,45 s |
| 3 | Carte lâchée trop tôt | On glisse la carte mais pas assez loin | Elle revient au centre avec un petit rebond | `retour-centre` (`.retour`) | 0,35 s |
| 3b | Tampons SMASH / PASS | Pendant qu'on glisse la carte | Le tampon apparaît en fondu au lieu de surgir d'un coup | `apparaitre-tampon` | 0,15 s |
| 4 | Cœur du bouton Smash | Clic sur Smash | Le cœur bat une fois | `battement` (`.pop`) | 0,45 s |
| 5 | Lien « Mes recettes » | Une nouvelle recette est smashée | Le lien saute pour montrer où la recette est rangée | `saut` (`.bump`) | 0,5 s |
| 6 | Nombre de filtres | Clic sur « Voir les recettes » | Le chiffre grossit une fois | `grossir` (`.pop`) | 0,4 s |
| 7 | Messages d'erreur | Envoi d'un formulaire faux (Partager, Signaler) | Le message fait une petite secousse « non » | `secousse` (`.secoue`) | 0,4 s |
| 8 | Pages | Changement de page (Découvrir, Mes recettes, Partager, Signaler) | La page apparaît en fondu en montant un peu | `entree-vue` (`.view.active`) | 0,35 s |
| 9 | Messages | « Aucune recette… », confirmation d'un signalement, états de chargement | Le message apparaît en fondu | `fondu` | 0,25 s |
| 10 | Chargement des recettes | Pendant que `data.json` se charge | Un rond orange tourne au-dessus du texte | `tourner` (en boucle : `infinite`) | 0,8 s |
| 11 | Fenêtres (filtres, détail) | Ouverture | Le fond s'assombrit en fondu et la fenêtre monte | `fondu-fond`, `monter` | 0,2 s |
| 11b | Notification (toast) | Smash, Passer, publication… | Le message monte du bas de l'écran | `toast-monte` (`.show`) | 0,22 s |
| 12 | Menu burger | Clic sur ☰ | Les 3 traits deviennent une croix ✕ et le menu descend | `croix-haut`, `croix-bas`, `apparaitre` | 0,16 à 0,2 s |
| 13 | Boutons Passer / Smash | Survol, clic | Le bouton monte de 3 px au survol, s'enfonce au clic | `soulever`, `enfoncer` | 0,12 à 0,15 s |
| 13b | Boutons, filtre, cartes de « Mes recettes » | Survol, clic | Montent de 2 px au survol, s'enfoncent au clic | `soulever-leger`, `enfoncer` | 0,12 à 0,15 s |
| 13c | Flèche du détail ↗ | Survol | La flèche tourne de 45° | `tourner-fleche` | 0,3 s |
| 13d | Liens du menu burger | Survol | L'icône glisse de 3 px vers la droite | `glisser` | 0,15 s |
| 13e | Envoi de photo (Partager) | Survol | La vignette penche un peu | `pencher` | 0,3 s |
| 14 | Étiquettes (Vegan, Bug…) | Quand on en coche une | L'étiquette grossit brièvement | `cocher` | 0,25 s |

## Comment le JavaScript déclenche les animations

### Relancer une animation : `rejouer()`

Une animation `@keyframes` ne se rejoue pas si la classe est déjà sur l'élément. Cette fonction l'enlève, force le navigateur à « oublier » l'état précédent, puis la remet :

```js
function rejouer(element, classe) {
  element.classList.remove(classe);
  void element.offsetWidth;      // le navigateur recalcule : l'animation pourra repartir
  element.classList.add(classe);
  element.addEventListener("animationend", function () {
    element.classList.remove(classe);
  }, { once: true });
}
```

Exemple : `rejouer(zoneErreurs, "secoue");` secoue le message d'erreur à chaque envoi raté.

### La sortie de la carte : `animerSortie()`

1. On ajoute `.sortie-smash` ou `.sortie-pass` : la carte joue `envol-gauche` ou `envol-droite` (320 ms, avec `forwards` pour qu'elle reste partie).
2. Après 320 ms (`setTimeout`), on enlève la classe, on affiche la recette suivante et on joue `.entree`.
3. Pendant l'animation, la variable `enAnimation` vaut `true` : un double clic n'envoie pas deux recettes d'un coup.

La durée est écrite à deux endroits, qui doivent rester identiques : `DUREE_SORTIE = 320` dans `app.js`, et `.32s` dans `style.css`.

### Le retour au centre

Quand la carte est lâchée trop tôt, elle garde sa position de glissement (dans `style.transform`) et reçoit la classe `.retour`. Comme `retour-centre` n'a pas de `from`, l'animation part de cette position. À l'événement `animationend`, le JavaScript efface la position et enlève la classe.

## Accessibilité : « Réduire les animations »

Certaines personnes ont des nausées ou des vertiges avec les mouvements à l'écran. Leur système peut le signaler au navigateur, et le site en tient compte à deux endroits :

- **En CSS**, avec `@media (prefers-reduced-motion: reduce)` : toutes les animations durent presque 0 s et ne se répètent pas (`animation-duration` et `animation-iteration-count`), le rond de chargement ne tourne plus et rien ne bouge au survol.
- **En JavaScript**, avec `window.matchMedia("(prefers-reduced-motion: reduce)")` : la recette suivante s'affiche tout de suite, sans attendre les 320 ms.

## Comment tester

1. Ouvre le site avec XAMPP (`http://localhost/m-291/swipeat/swipeat/`) et fais **Ctrl+F5**.
2. Clique sur **Smash** puis sur **Passer** : la carte part à gauche puis à droite, la suivante arrive et le prix « tombe ».
3. Glisse la carte un peu puis lâche-la : elle revient au centre. Glisse-la loin : elle s'envole.
4. Va dans **Partager une recette** et clique sur **Publier** sans rien remplir : le message d'erreur se secoue.
5. Pour voir les animations au ralenti : **F12 → ⋮ → More tools → Animations**, puis choisis la vitesse 10 %. Le panneau affiche aussi le nom de chaque `@keyframes` jouée.
6. Pour tester « Réduire les animations » : **F12 → Ctrl+Shift+P → tape « reduced motion » → Emulate CSS prefers-reduced-motion: reduce**. Les recettes doivent changer sans animation.

## Fichiers modifiés

- `style.css` : bloc « Animations (@keyframes…) » à la fin du fichier. Toutes les anciennes `transition` ont été retirées.
- `js/app.js` : fonctions `rejouer()` et `animerSortie()` (avant `move()`), plus les appels dans `move()`, le glissement de la carte, le bouton des filtres et les deux formulaires.
