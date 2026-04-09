# Simulateur de Fluide Interactif (p5.js)

## 1. Intention du Projet
[cite_start]L'objectif est de créer une simulation visuelle basée sur la physique des fluides et l'interaction utilisateur[cite: 5]. [cite_start]Le programme vise à provoquer de la satisfaction par la réactivité du mouvement et le jeu avec l'inertie[cite: 6, 7].

## 2. Caractéristiques Techniques
* [cite_start]**Dimensions du Canvas** : 600 x 400 pixels[cite: 14].
* **Modèle de Rendu** : Programmation Orientée Objet (POO) via des classes modulaires.
* **Gestion de l'Eau** : Utilisation d'un masque de découpe (`drawingContext.clip`) pour confiner le liquide à l'intérieur des parois du verre.
* **Physique** : Système de particules avec vecteurs de force pour la gravité, l'impulsion et le rebond.

## 3. Éléments Visuels et Palette
[cite_start]Le projet utilise une palette de couleurs restreinte pour garantir la clarté de la simulation[cite: 27]:
* [cite_start]**Fond** : Gris neutre (`#F0F0F0`)[cite: 18].
* **Contenant** : Gris anthracite (`#505050`) avec une épaisseur de trait de 5px.
* **Fluide** : Bleu vif semi-transparent (`rgba(0, 120, 255, 200)`).
* [cite_start]**Particules** : Opacité variable (255 à 0) pour simuler la disparition et l'évaporation des gouttes[cite: 32].

## 4. Interaction et Contrôles
* [cite_start]**Inclinaison** : La position horizontale de la souris contrôle l'angle cible du verre[cite: 43].
* **Inertie** : Utilisation de l'interpolation linéaire (`lerp`) pour simuler le poids et la fluidité du mouvement.
* **Éclaboussures** : Une vitesse de déplacement de la souris supérieure à 25px par frame déclenche l'éjection de particules hors du verre.

## 5. Structure du Code
Le code est structuré de manière modulaire en deux classes principales :
1.  **Classe Glass** : Encapsule la position, la rotation, le niveau d'eau et le rendu du masque de découpe.
2.  **Classe Particle** : Gère la trajectoire balistique des gouttes d'eau, leur cycle de vie et leurs collisions avec les parois virtuelles.

## 6. Utilisation
1.  Copier le code source dans un environnement compatible p5.js (comme le p5.js Web Editor).
2.  Exécuter le programme (bouton Play).
3.  Déplacer la souris latéralement pour manipuler le verre.
4.  Effectuer des mouvements brusques pour provoquer des projections de liquide.

## 7.Traçabilité 
1. J'ai utilisé l'ia pour la partie de génération des particules, le masque du rectangle représentant l'eau du verre
2. Prompt utilisé : Voici mes spécifications. Ne génère pas le code final. Aide-moi à coder étape par étape en m'expliquant chaque fonction p5.js dont j'ai besoin. Commence par la section Canvas.
Le code devra être simple orienté objet, et qui utilise les vecteurs. Je voudrais un verre qu'on pourra secouer en agitant la souris de gauche à droite et de l'eau sortira donc du verre quand on le secoue. le code devra être structuré et adaptable pour pouvoir le modifier par la suite.
3. J'ai effectué plusieurs modifications comme l'angle d'inclinaison du verre, la taille, l'orientation et les propriétés de la réduction du rectangle d'eau, la détection de la souris (changement de place dans le plan).
