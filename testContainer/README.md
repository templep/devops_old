# Les TestsContainers
## Introduction
&nbsp;&nbsp;&nbsp;&nbsp; Les Testcontainers permettent de créer des conteneurs Docker jetables pour les tests d'intégration. Ils peuvent être utilisés pour démarrer des conteneurs Docker pour les tests et les arrêter automatiquement une fois les tests terminés.


&nbsp;&nbsp;&nbsp;&nbsp;On a fait le choix de suivre en partie un Quickstart sur le site mais 
aussi de chercher des informations dans la documentation afin d’essayer 
la technologie. Pour l’utiliser, on a mis en place une base de données Redis 
et gérer les importations dans un pom.xml
Dans cette partie, on a créé un conteneur Redis afin de le tester via 
des tests unitaires.


## Contenue du projet java
&nbsp;&nbsp;&nbsp;&nbsp;Vous pouvez trouver dans le programme un fichier pom.xml qui importe 
les dépendances liées à testcontainers et redis. Vous pouvez également 
trouver un dossier test contenant la classe RedisContainer permettant de 
démarrer un conteneur Redis sur un certain que l’on a choisi qui est le 
6379 (port par défaut de Redis). Ce dossier contient également la classe 
RedisTest. Dans celle-ci on utilise le décorateur TestContainer pour 
indiquer que la classe est une classe servant à tester un conteneur. 
On utilise ensuite le décorateur Container pour indiquer le conteneur 
que l’on va tester. Il y a également un décorateur BeforeAll qui permet de 
faire fonctionner la base de données pour la tester. On utilise ensuite 
les décorateurs de Junit Test pour exécuter les tests. Enfin on a un 
décorateur AfterAll pour fermer le conteneur.


## Problèmes rencontrés

&nbsp;&nbsp;&nbsp;&nbsp;On a rencontré certaines difficultés dans le tuto de base en voulant 
appliquer le tuto directement sur un projet existant plutôt que de créer 
un projet. C’est pourquoi on a créé ce projet pour mettre en application le tuto. 
On s’est ensuite aperçu que la documentation du site nous a permis de 
mieux mettre en place le projet avec la technologie, notamment au niveau des 
imports. Afin de générer d’autres tests on a aussi cherché d’autres sources.

## Conclusion
&nbsp;&nbsp;&nbsp;&nbsp; Les Testcontainers peuvent aider à mettre en place du continuous integration en fournissant un environnement de test cohérent et portable pour les tests d'intégration. Ils permettent également de tester le code dans des environnements isolés, ce qui réduit le risque de dépendances système ou de conflits avec d'autres processus. Les Testcontainers peuvent être facilement intégrés dans des outils d'automatisation tels que Jenkins pour exécuter des tests d'intégration à chaque étape du pipeline de développement.

