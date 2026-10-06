# Brief de Conception — Swipeat

## 1. Contexte & Problématique

Les étudiants en Suisse romande disposent souvent d'un budget limité et de peu de temps pour préparer leurs repas. Il peut être difficile de trouver rapidement des recettes simples, peu coûteuses et adaptées à ses besoins alimentaires. Swipeat propose une expérience de découverte basée sur le swipe afin de trouver facilement des recettes qui correspondent aux goûts et au budget de chaque étudiant.

## 2. Profil de l'Utilisateur Cible (Persona)

- **Prénom & Âge :** Thomas, 19 ans
- **Contexte d'utilisation :** À la maison après les cours ou dans les transports, principalement sur smartphone 390 px.
- **Besoins clés :** Rapidité, simplicité, recettes peu coûteuses, informations lisibles immédiatement et filtres alimentaires faciles à utiliser.

## 3. Fonctionnalités Essentielles (Périmètre MVP)

1. Affichage des recettes sous forme de cartes avec photo, prix, temps de préparation et étiquettes.
2. Système de swipe permettant de « Smash » ou « Pass » une recette.
3. Filtrage instantané par budget, temps, difficulté et régime alimentaire.
4. Recherche dynamique par mot-clé.
5. Consultation d'une fiche détaillée avec les ingrédients et les étapes de préparation.
6. Ajout des recettes en favoris.
7. Publication d'une recette avec une photo, une description, les ingrédients et des étiquettes.
8. Confirmation visuelle après une action, comme l'ajout d'une recette aux favoris.

## 4. Contraintes Techniques & Ergonomiques

- **Approche :** Mobile First (largeur de référence 390 px).
- **Technologie :** Vanilla HTML5 sémantique, CSS moderne avec variables, JavaScript natif sans bibliothèque.
- **Accessibilité :** Ratios de contraste WCAG AA (≥ 4,5:1), navigation clavier assurée.
- **Interface :** Navigation simple, intuitive et rapide à comprendre.
- **Responsive :** L'application doit s'adapter aux différentes tailles d'écran.
- **Performance :** Chargement rapide et utilisation fluide, notamment sur smartphone.