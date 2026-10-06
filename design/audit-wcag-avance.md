# Audit WCAG avancé — Swipeat

## 1. Contraste du label

Le label utilise la couleur `#94a3b8` sur un fond `#f8fafc`.

Le ratio de contraste mesuré est de **2,45:1**.

Ce contraste n'est **pas conforme** au niveau WCAG AA, qui demande un ratio minimum de **4,5:1** pour du texte normal.

**Correction proposée :** utiliser une couleur de texte plus foncée afin d'améliorer la lisibilité.

## 2. Propriété `outline: none` de l'input

La propriété `outline: none` supprime l'indicateur visuel qui apparaît normalement lorsqu'un élément reçoit le focus au clavier.

Pour une personne naviguant avec la touche **Tab**, il devient donc difficile voire impossible de savoir quel élément est actuellement sélectionné.

Cela constitue une barrière d'accessibilité, car l'utilisateur ne peut plus repérer visuellement le focus.

**Correction proposée :** conserver un contour visible ou créer un style `:focus` personnalisé avec un contraste suffisant.

Exemple :
`input:focus { outline: 2px solid #f97316; }`

## 3. Taille de la zone cliquable du bouton « Valider »

La zone cliquable du bouton doit être suffisamment grande pour être facilement utilisée sur un écran tactile.

Le standard WCAG 2.2 recommande une cible d'au moins **24 × 24 px CSS** dans la plupart des cas, avec des exceptions prévues par le standard. Pour une meilleure ergonomie mobile, une cible d'environ **44 × 44 px** est recommandée.

**Conclusion :** si le bouton « Valider » est inférieur à 24 × 24 px, il n'est pas conforme au minimum WCAG. S'il fait environ 44 × 44 px ou plus, il offre une bonne zone tactile.

## 4. Signal d'erreur et daltonisme rouge-vert

Le signal d'erreur ne doit pas être indiqué uniquement avec la couleur rouge.

Une personne atteinte de daltonisme rouge-vert peut avoir des difficultés à distinguer le rouge du vert. Si l'erreur est uniquement représentée par une couleur, l'information peut donc être perdue.

**Correction proposée :** combiner la couleur avec un autre indicateur visuel et un texte explicatif.

Exemple :
**⚠ Erreur : veuillez renseigner votre adresse e-mail.**

La couleur, l'icône et le message permettent ainsi de comprendre l'erreur sans dépendre uniquement de la perception des couleurs.
