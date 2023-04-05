# Scott & Junit4
Les tests unitaires sont une partie essentielle du développement logiciel moderne et de la pratique DevOps. Les tests unitaires sont des tests automatisés qui vérifient le fonctionnement correct d'une petite partie du code source (une unité) de manière isolée, souvent une fonction ou une méthode.

Les tests unitaires sont importants dans le DevOps pour plusieurs raisons:

1. Fournir un retour rapide: Les tests unitaires sont automatisés et peuvent être exécutés rapidement. Cela permet de détecter les erreurs et les bugs plus tôt dans le cycle de développement, ce qui permet de les corriger plus rapidement et à moindre coût.

2. Assurer la qualité du code: Les tests unitaires permettent de vérifier que chaque unité de code fonctionne correctement et en conformité avec les spécifications. Cela garantit que le code est de haute qualité et qu'il fonctionne comme prévu.

3. Faciliter la maintenance: Les tests unitaires permettent de s'assurer que les modifications apportées au code source ne causent pas de régressions dans le fonctionnement des unités déjà testées. Cela facilite la maintenance et les modifications du code source sans introduire de nouveaux bugs.

4. Encourager l'automatisation: Les tests unitaires sont une partie essentielle de l'automatisation des tests, ce qui est un élément clé du DevOps. L'automatisation des tests permet de vérifier rapidement et efficacement le fonctionnement du code source, ce qui permet de libérer les développeurs des tâches de tests manuelles fastidieuses.

5. Permettre une intégration continue: Les tests unitaires sont un élément essentiel de l'intégration continue. Ils permettent de vérifier rapidement que les modifications apportées au code source ne causent pas de régressions, ce qui est une étape essentielle pour assurer la qualité du code et permettre une intégration continue réussie.

En résumé, les tests unitaires sont essentiels pour garantir la qualité du code, faciliter la maintenance, encourager l'automatisation et permettre une intégration continue réussie dans les pratiques DevOps.


Scott est un outil pour les tests, qui permet de remonter la stack en affichant les valeurs des variables et des paramètres au long de l'exécution du test.


## Installation
>Pour installer scott, nous avons ajouter la dépendance dans notre pom.xml. maven se charge d'installer Scott

## Utilisation

>Une fois ajouter, viendra ajouter son anayse des tests dans la console apres le build de maven.

> Scott execute son analyse seulement si le test ne passe pas. Par conséquent, dans notre rendu, nous avons fait expres de

>Pas de manipulation suplémentaire est à faire pour utiliser la dépendance avec les paramettres par défaut.

## Problemes rencontrés

>Faire attention aux problemes de version du plugin en fonction de la version de java utilisée.
Nous avons eu un problème avec une boucle foreach. scott ne parvenait pas à remonter la stack et nous lancait une erreur. les boucles for sont donc à éviter dans les tests.

> Nous n'avons pas pu utiliser Scott avec Junit5 car il y a une issue active sur leur github. N'etant pas une version stable, nous avons préféré nous rabbatre sur une version stable.

## Conclusion

Scott est une dépendance utile à ajouter lors du test de votre projet, permettant de faciliter la détection des erreurs et de les corriger plus rapidement. 