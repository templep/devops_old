# DevOps_Tuto

# **Intégration continue, Analyse statique et Automatisation des tests**

## **Description**
Ce tutoriel entre dans le cadre des travaux pratiques du cours de DevOps vu en ESIR 2 (SI).

Dans ce dernier, nous réaliserons au sein d'un projet au choix, toute la démarche d'intégration continue, d'analyse statique et d'automatisation des tests.
Nous avons pour ce faire à notre disposition toute une flopée d'outils (chacun entrant dans une catégorie spécifique) que nous essayerons d'adopter dans la mise en oeuvre de la CI, de l'analyse statique de code ainsi que de l'automatisation des tests

# Sommaire

- [1 - Présentation du projet](#1---présentation-du-projet)

- [2 - Intégration Continue](#2---intégration-continue)

- [3 - Présentation et mise en place des outils](#3---présentation-et-mise-en-place-des-outils)

- [4 - Observations et commentaires](#4---observations-et-commentaires)

- [5 - Guide de lancement](#5---guide-de-lancement)

- [6 - Démo](#6---demo)

# 1 - Présentation du projet

Pour ce tutoriel, nous utiliserons un projet réalisé dans le cadre du cours d'Architecture Logiciel.
Ce dernier est composé d'un ensemble de microservices interagissants ensemble.
L'on dispose donc:

- D'un backend chargé de toutes les opérations CRUD (Create, Retreive, Update, Delete) sur les membres des associations. Ce dernier est developpé en **NestJs**;

- Une base de données PostgreSQL pour le stockage (une image docker dans notre cas); 

- D'un frontend naturellement pour l'aspect visuel du site web réalisé en **Angular**;

- Un MOM Rabbitmq pour la création d'un queue destinée à être utilisée pour l'envoie des mails;

- Un microservice Quarkus qui implémente le consumer pour la queue Rabbitmq. Ce microservice est chargé de la logique pour l'envoie des mails;

L'ensemble de ses microservice sont déployés au sein de containers docker.



# 2 - Intégration Continue


L'intégration continue est une pratique de développement logiciel dans laquelle les membres d'une équipe intègrent leur travail fréquemment, en général chaque personne intègre au moins une fois par jour ce qui conduit à plusieurs intégrations par jour. Chaque intégration est vérifiée par une construction automatisée (y compris des tests) afin de détecter les erreurs d'intégration le plus rapidement possible. De nombreuses équipes estiment que cette approche permet de réduire considérablement les problèmes d'intégration et de développer plus rapidement des logiciels cohérents.

Une fois qu’on sait ce qu’est l'intégration continue de façon globale,  faire en sorte que tout cela fonctionne sans accroc, c'est évidemment un peu plus complexe que cela. Nous allons dans la suite nous  concentrer sur les pratiques clés qui font d'une intégration continue une totale réussite.

 ## **- Maintenir un référentiel unique pour le projet**
 
Celà peut paraitre anodin mais les projets logiciels impliquent de nombreux fichiers qui doivent être orchestrés ensemble pour construire un produit. Garder la trace de tous ces fichiers représente un effort considérable, en particulier lorsque plusieurs personnes sont impliquées. Il n'est donc pas surprenant qu'au fil des ans, les équipes de développement de logiciels aient créé des outils pour gérer tout cela. Ces outils, appelés outils de gestion du code source, font partie intégrante de la plupart des projets de développement. Il suffit donc de s'assurer que l'on dispose d'un système de gestion du code source décent. Le coût n'est pas un problème car il existe des outils open-source de bonne qualité. Le référentiel open source de prédilection étant Github, c'est celui que nous utiliserons dans ce TP.

 ## **- Automatiser la phase du build**

Transformer du code source en un système opérationnel peut souvent être un processus compliqué impliquant la compilation, le déplacement de fichiers, le chargement de schémas dans les bases de données, etc. Cependant, comme la plupart des tâches de cette partie du développement logiciel, ce processus peut être automatisé et devrait l'être. Demander à des personnes de taper des commandes étranges ou de cliquer sur des boîtes de dialogue est une perte de temps et un terrain propice aux erreurs.On doit donc s'assurer de pouvoir construire et lancer notre système à l'aide de ces scripts en utilisant une seule commande.
 
 ## **- Rendre notre build auto testable**
  
Traditionnellement, une compilation signifie compiler, lier et tout ce qui est nécessaire pour qu'un programme s'exécute. Un programme peut s'exécuter, mais cela ne signifie pas qu'il fait ce qu'il faut. Les langages modernes à typage statique permettent de détecter de nombreux bogues, mais beaucoup d'autres passent à travers les mailles du filet.

Un bon moyen de détecter les bogues plus rapidement et plus efficacement est d'inclure des tests automatisés dans le processus de construction.Ce que nous ferons un peu plus bas.

  
## **- Tout le monde commit sur le main chaque jours**

Comme vu en cours le devops c'est plus que des outils, "c'est une philosophie" et également un ensemble de bonnes pratiques parmi lesquelles figure la communication au sein de l'équipe.  L'intégration est avant tout une question de communication. L'intégration permet aux développeurs d'informer les autres développeurs des modifications qu'ils ont apportées. Une communication fréquente permet aux gens d'être informés rapidement de l'évolution des changements.

La seule condition préalable pour qu'un développeur s'engage sur le main est qu'il puisse construire correctement son code. Cela implique, bien sûr, de réussir les tests de compilation. Comme pour tout cycle de validation, le développeur met d'abord à jour sa copie de travail (sa branche), pour qu'elle corresponde à la branche main, résout les éventuels conflits avec la ligne principale, puis construit sur sa machine locale. Si la compilation est réussie, il est alors libre de valider la version principale.
En procédant fréquemment de la sorte, les développeurs découvrent rapidement s'il existe un conflit entre deux développeurs.

    
## **- Chaque 'Commit' doit enclencher un Build sur la machine d'intégration**

En utilisant des livraisons quotidiennes, une équipe obtient fréquemment des versions testées. Cela devrait signifier que la branche main reste saine. Dans la pratique, cependant, il y a toujours des problèmes. L'une des raisons est que souvent les developpeurs speuvent oublier d'effectuer les mises à jour et les compilations avant de valider. Les différences d'environnement entre les machines des développeurs en sont une autre.

Par conséquent, on doit pouvoir s'assurer que les constructions régulières sont effectuées sur une machine d'intégration et que la livraison n'est considérée comme effectuée que si cette construction d'intégration réussit. Étant donné que le développeur qui effectue la validation est responsable de cette opération, il doit surveiller la version principale afin de pouvoir la corriger en cas de défaillance. 

Il y a deux façons principales de s'assurer de cela : en utilisant **une construction manuelle** ou **un serveur d'intégration continue**.

L'approche manuelle est la plus simple à décrire. Il s'agit essentiellement d'un processus similaire à la construction locale qu'un développeur effectue avant la livraison dans le référentiel. Le développeur se rend à la machine d'intégration, vérifie la tête de la ligne principale (qui contient maintenant sa dernière livraison) et lance la construction d'intégration. Il garde un œil sur sa progression, et si la compilation réussit, il en a terminé avec sa livraison.

Un serveur d'intégration continue agit comme un moniteur du référentiel. Chaque fois qu'un commit contre le référentiel se termine, le serveur extrait automatiquement les sources sur la machine d'intégration, lance une compilation et notifie le résultat de la compilation à l'auteur du commit. L'auteur de la validation n'a pas terminé tant qu'il n'a pas reçu la notification généralement un courriel.
    
## **- Corriger immédiatement les erreurs de Build**

Un élément clé de la construction continue est que si la construction principale échoue, elle doit être corrigée immédiatement. L'intérêt de travailler avec l'intégration continue est que vous développez toujours sur une base stable connue. Ce n'est pas une mauvaise chose que la version principale tombe en panne, bien que si cela se produit tout le temps, cela suggère que les gens ne sont pas assez attentifs à la mise à jour et à la construction locale avant la validation. Cependant, lorsque la version principale est défaillante, il est important qu'elle soit corrigée rapidement.

## **- Rendre rapide l'étape du Build**

L'objectif de l'intégration continue est de fournir un retour d'information rapide. Rien n'est plus dommageable pour une activité d'intégration continue qu'une compilation qui prend beaucoup de temps.  La plupart des developpeurs considèrent qu'un Build qui prend une heure est totalement déraisonnable. Cependant, certaines équipes rêvraient de pouvoir le faire aussi rapidement et il nous arrive encore de rencontrer des cas où il est très difficile d'atteindre cette vitesse.

Pour la plupart des projets, cependant, la ligne directrice XP d'une construction en dix minutes est parfaitement raisonnable. La plupart de nos projets modernes y parviennent. Cela vaut la peine de concentrer les efforts pour y parvenir, car chaque minute de réduction du temps de construction est une minute gagnée pour chaque développeur à chaque fois qu'il effectue une validation. 

Si vous êtes confronté à un temps de construction d'une heure, passer à une construction plus rapide peut sembler une perspective décourageante. Il peut même être décourageant de travailler sur un nouveau projet et de penser à la façon de garder les choses rapides. Pour les applications d'entreprise, en tout cas, nous avons constaté que le goulot d'étranglement habituel est le test - en particulier les tests qui impliquent des services externes tels qu'une base de données.
    
## **- Tester dans un Clone de l'environnement de production**

L'objectif des tests est d'éliminer, dans des conditions contrôlées, tout problème que le système rencontrera en production. L'environnement dans lequel le système de production fonctionnera joue un rôle important à cet égard. Si vous testez dans un environnement différent, chaque différence entraîne un risque que ce qui se passe pendant les tests ne se produise pas en production.

C'est pourquoi on doit configurer notre environnement de test de manière à ce qu'il imite le plus fidèlement possible notre environnement de production. on utilise par exemple le même logiciel de base de données, avec les mêmes versions, la même version du système d'exploitation. On met aussi toutes les bibliothèques appropriées qui se trouvent dans l'environnement de production dans l'environnement de test, même si le système ne les utilise pas réellement. Utilisez les mêmes adresses IP et les mêmes ports, utilisez le même matériel.
    
## **- Permettre à tout le monde d'obtenir facilement le dernier executable**

L'une des parties les plus difficiles du développement de logiciels est de s'assurer que l'on construit le bon logiciel. Nous avons constaté qu'il est très difficile de spécifier à l'avance ce que l'on veut et d'être correct ; les gens trouvent beaucoup plus facile de voir quelque chose qui n'est pas tout à fait correct et de dire comment il faut le changer. Les processus de développement agile s'attendent explicitement à cette partie du comportement humain et en tirent parti.

Pour que cela fonctionne, toute personne impliquée dans un projet logiciel devrait pouvoir obtenir le dernier exécutable et être en mesure de l'exécuter : pour des démonstrations, des tests exploratoires ou simplement pour voir ce qui a changé cette semaine.
    
## **- Tous les développeur doivent être en mesure de voir ce qui se passe**

L'intégration continue est une question de communication. Il faut donc s'assurer que tout le monde peut facilement voir l'état du système et les changements qui y ont été apportés.

L'une des choses les plus importantes à communiquer est l'état de la construction de la ligne principale.De nombreuses équipes aiment rendre cela encore plus évident en connectant un affichage continu au système de construction - les lumières qui s'allument en vert lorsque la construction fonctionne, ou en rouge si elle échoue, sont populaires. Les lampes de lave rouges et vertes sont particulièrement courantes. Elles indiquent non seulement l'état de la compilation, mais aussi depuis combien de temps elle se trouve dans cet état. Des bulles sur une lampe rouge indiquent que la construction est en panne depuis trop longtemps.

## **- Automatiser le déploiement**

Pour faire de l'intégration continue, on a besoin de plusieurs environnements, un pour exécuter les tests de validation, un ou plusieurs pour exécuter les tests secondaires. Puisqu'on déplace des exécutables entre ces environnements plusieurs fois par jour,on souhaiterais le faire automatiquement. Il est donc important d'avoir des scripts qui nous permettront de déployer facilement l'application dans n'importe quel environnement.

Une conséquence naturelle de cela est qu'on devra également avoir des scripts qui nous permettent de déployer en production avec la même facilité.Il s'agit également d'une option peu coûteuse puisqu'elle utilise les mêmes capacités que celles utilisées pour le déploiement dans les environnements de test.


# 3 - Présentation et mise en place des outils

Dans cette section, l'on décrirera de façon précises les outils choisis. L'on expliquera également toute la démarche et la mise en place de ces derniers. L'on parlera également

## **Bazel**

- [x] **Présentation:** Bazel est un système de construction (build system) open source développé par Google. Il est conçu pour permettre la construction d'applications de manière efficace, rapide et reproductible, en particulier pour des projets de grande envergure avec de nombreuses dépendances et configurations. Bazel utilise une approche basée sur des *règles* pour définir comment construire des projets. Les règles Bazel décrivent comment les différentes parties d'un projet sont compilées, liées, testées et déployées. Les règles sont écrites en utilisant une syntaxe de type fonction, qui permet aux développeurs de décrire de manière précise comment les dépendances doivent être résolues, comment le code doit être compilé et comment les artefacts doivent être créés.

- [x] **Raisons du choix:** L'un des principaux avantages de Bazel est sa capacité à effectuer des builds incrémentiels, où seules les parties du projet qui ont été modifiées depuis le dernier build sont reconstruites. Cela peut réduire considérablement *les temps de build*, en particulier pour des projets de grande envergure.Bazel prend en charge plusieurs langages de programmation, y compris C++, Java, Python, et de nombreux autres. Il est également compatible avec plusieurs plateformes, y compris Linux, macOS et Windows. Dans notre cas nous sommes dans un environement linux et les langages concernés par notre application sont: TypeScript pour notre backend nestjs et notre frontend angular et Java pour notre microservice quarkus. Notre MOM RabbitMQ et notre database ne nous interesserons pas dans cette section étant donné le choix que nous avons fait de les exécuter autravers d'image docker vu qu'ils ne nécessite pas de configuration suppélementaire de notre part.

- [x] **Mise en oeuvre:** Bazel construit des logiciels à partir d'un code source organisé dans une arborescence de répertoires appelée espace de travail. Les fichiers sources de l'espace de travail sont organisés dans une hiérarchie imbriquée de paquets, où chaque paquet est un répertoire qui contient un ensemble de fichiers sources apparentés et un fichier BUILD. Le fichier BUILD spécifie les sorties logicielles qui peuvent être construites à partir du code source.
Un espace de travail est une arborescence de répertoires sur votre système de fichiers qui contient les fichiers sources du logiciel que vous souhaitez construire. Chaque espace de travail possède un fichier texte nommé WORKSPACE qui peut être vide ou contenir des références à des dépendances externes nécessaires à la construction des résultats.
Dans notre situation, 

!! Les répertoires contenant un fichier appelé WORKSPACE sont considérés comme la racine d'un espace de travail. Par conséquent, Bazel ignore toute arborescence de répertoires dans un espace de travail dont la racine est un sous-répertoire contenant un fichier WORKSPACE, car ils forment un autre espace de travail.



## **Jenkins**
- [x] **Présentation:** Jenkins est un outil open-source d'intégration continue et de déploiement continu (CI/CD) qui permet de construire, tester et déployer des logiciels de manière automatisée. Il est principalement utilisé pour automatiser les tâches répétitives du processus de développement logiciel, telles que la compilation de code source, l'exécution de tests, la construction d'images Docker, le déploiement sur différents environnements, etc.

- [x] **Raisons du choix:** Jenkins offre une grande flexibilité et peut être facilement intégré avec d'autres outils de développement logiciel tels que Git, GitHub, SVN, Jira, etc. Il dispose également d'une large communauté de développeurs et de contributeurs, ce qui lui permet de disposer d'un grand nombre de plugins pour étendre ses fonctionnalités et s'adapter à différents besoins.

En somme, Jenkins est un outil essentiel pour les équipes de développement logiciel qui souhaitent automatiser leur processus de déploiement et de test, afin de pouvoir fournir des logiciels de haute qualité plus rapidement et plus efficacement. Ce qui est notre cas.



## **SonarCloud**
- [x] **Présentation:** C'est un service cloud d'analyse de code proposé par la société SonarSource. Il permet aux développeurs et aux équipes de développement de détecter et de corriger les vulnérabilités, les bugs, les erreurs et les problèmes de qualité de code dans leurs applications. SonarCloud utilise une variété de techniques d'analyse statique pour évaluer la qualité du code, y compris l'analyse de la complexité cyclomatique, la détection de code dupliqué, la couverture de code, la conformité aux normes de codage et la détection de vulnérabilités de sécurité connues.

- [x] Raisons du choix: En intégrant SonarCloud dans notre processus de développement, on améliore la qualité de notre code, réduit les bugs et les vulnérabilités et on améliore la sécurité globale de notre application.SonarCloud propose des intégrations avec de nombreux outils de développement populaires tels que GitHub, GitLab et Azure DevOps ce qui constitue d'ailleurs l'une des raisons majeurs de son adoption.

- [x] Mise en oeuvre: Pour l'intégrer à notre projet rien de plus simple:
  - Se rendre sur le site officiel de SonarCloud: https://sonarcloud.io;
  - Se connecter via notre compte de versionnage de code en l'occurence *github* dans notre cas;
  - Selectionner le "repository" concerné;

![Capture d’écran du 2023-03-28 01-44-37](https://user-images.githubusercontent.com/107374001/228092766-8dae148f-325f-4886-b956-f1a097b056c9.png)

                                               Apperçu du dashboard avant 
                                               
![Capture d’écran du 2023-03-28 01-45-37](https://user-images.githubusercontent.com/107374001/228093202-0120c4a0-9763-4a5e-8838-7824dd26f270.png)
                                               
                                               Apperçu du dashboard après prise en compte  


On remarque aisement dans l'ensemble que Sonarcloud est un outil puissant qui a permis d'améliorer la qualité du code et de s'assurer que notre base de code est maintenable, évolutive et sécurisée.


## **Skymutator**

## **CI/CD pipeline avec Github actions**


# 4 - Observations et commentaires


# 5 - Guide de lancement


# 6 - Démo





