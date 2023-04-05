# Stryker Mutator

## Principe
Stryker mutator est un outil de test de mutation qui aide les développeurs à améliorer la qualité de leurs tests unitaires en évaluant l'efficacité des tests. Le principe de base de Stryker est de générer des versions mutées de notre code source, puis de lancer nos tests unitaires sur ces versions mutées.

Le processus de mutation consiste à prendre le code source d'un projet et à y apporter des modifications aléatoires. Ces mutations incluent des modifications telles que la suppression d'un opérateur de comparaison, la modification d'une valeur numérique ou la suppression d'une instruction de retour. Ces mutations sont conçues pour simuler des erreurs courantes qui peuvent se produire dans le code et pour vérifier que nos tests unitaires peuvent détecter ces erreurs.

Le résultat de l'analyse de mutation est un rapport qui indique combien de mutations ont été détectées et combien ont réussi à échapper aux tests. Ce rapport peut aider les développeurs à identifier les zones du code qui nécessitent des tests unitaires supplémentaires et à améliorer la qualité globale de leurs tests.

Stryker mutator est une librairie npm qui s'installe facilement. Il est principamement utilisé pour des projets web qui utilisent un framework javascript.

## Utilisation
Pour utiliser Stryker mutator, nous avons repris un projet web fait dans un autre. Nous avons suivi le tutoriel d'installation qui se trouve sur le site web. Celui-ci est très complet et simple de mise en place.

[Tutoriel](https://stryker-mutator.io/docs/stryker-js/getting-started/)

Afin de lancer nos tests, nous n'avons que la commande : \
```npx stryker run```

A partir de là on peut si on le souhaite, personnalisé notre fichié de config afin de par exemple intégré un dashboard. De plus lorsque l'on lance la commande ci-dessus cela génère un dossier sandbox qui contient les tests mutés.

De notre côté, nous avons un problème de configuration qui fait que les tests ne sont pas exécutés. Cependant nous arrivons quand même à générer les tests mutés.

## Conclusion
En somme, Stryker peut aider à intégrer le processus de test dans le cycle DevOps en automatisant les tests unitaires, en améliorant la qualité des tests et en détectant les erreurs dans le code avant la mise en production.