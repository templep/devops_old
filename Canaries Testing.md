# A/B Testing
## Presentation
Les tests canaris (canary testing en anglais) sont une technique de déploiement logiciel qui consiste à lancer une nouvelle fonctionnalité ou une mise à jour auprès d'un petit groupe d'utilisateurs, avant de la déployer à grande échelle. L'objectif du test canari est de détecter rapidement les éventuels problèmes ou bugs dans la nouvelle fonctionnalité avant qu'elle ne soit proposée à tous les utilisateurs.
Le principe du test canari est similaire à celui de l'exploitation minière, où les mineurs emmenaient avec eux des canaries, qui sont plus sensibles que les mineurs aux effets du monoxyde de carbone et des autres gaz dangereux. Ils étaient donc utilisés pour alerter les équipes des changements de conditions dans la mine. Les canaries étaient envoyé dans une mine pour détecter d'éventuelles fuites de gaz ou de danger, avant que les mineurs ne soient autorisés à y entrer. Dans le contexte des tests canaris, un petit groupe d'utilisateurs est sélectionné pour tester une nouvelle fonctionnalité ou une mise à jour, et les données recueillies sur leur comportement sont ensuite analysées pour détecter les éventuels problèmes.
Les tests canaris sont souvent effectués en utilisant une technique appelée "fractionnement de trafic", où un pourcentage du trafic du site web ou de l'application est redirigé vers la nouvelle fonctionnalité, tandis que le reste du trafic est dirigé vers la version précédente. Les utilisateurs qui sont inclus dans le groupe de test canari peuvent être sélectionnés au hasard ou selon des critères spécifiques, tel que leur emplacement géographique.
Les tests canaris peuvent être très utiles pour minimiser les risques de déploiement de nouvelles fonctionnalités ou mises à jour, et pour améliorer la qualité des produits logiciels en détectant rapidement les problèmes. Ils permettent également de tester des fonctionnalités auprès d'un public limité avant de les déployer à grande échelle, ce qui peut aider les équipes de développement à prendre des décisions plus éclairées.
Il est important de noter que les tests canaris ne garantissent pas une détection à 100 % des problèmes potentiels, ils permettent d'en détecter un certain nombre seulement. Cependant, ils sont considérés comme une méthode efficace pour minimiser les risques et améliorer la qualité des produits logiciels.

Nous allons maitenant vous montrer un exemple général de code en Javascript pour effectuer un test canari en utilisant la technique de fractionnement de trafic:
```function isCanari() {
  // Si l'utilisateur est dans le groupe canari, retourne true
  return Math.random() < 0.01; // 1% des utilisateurs seront dans le groupe canari
}
if (isCanari()) {
  // Charge la version mise à jour
  loadNewFeature();
} else {
  // Charge la version précédente
  loadOldFeature();
}
```
Comme nous pouvons le voir, la fonction isCanari est utilisée pour déterminer si l'utilisateur est dans le groupe canari, qui représente 1% des utilisateurs. Si l'utilisateur est dans le groupe canari, la version mise à jour est chargée, sinon la version précédente est chargée.
Il est important de noter que ce code est un exemple général. En vérité il faudrait pour que le test soit pertinent, que l'utilisateur rentre dans un certain nombre de conditions "intéressantes"(âge, sexe, localisation,etc...).
