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

 **- Maintenir un référentiel unique pour le projet**
 
Celà peut paraitre anodin mais les projets logiciels impliquent de nombreux fichiers qui doivent être orchestrés ensemble pour construire un produit. Garder la trace de tous ces fichiers représente un effort considérable, en particulier lorsque plusieurs personnes sont impliquées. Il n'est donc pas surprenant qu'au fil des ans, les équipes de développement de logiciels aient créé des outils pour gérer tout cela. Ces outils, appelés outils de gestion du code source, font partie intégrante de la plupart des projets de développement. Il suffit donc de s'assurer que l'on dispose d'un système de gestion du code source décent. Le coût n'est pas un problème car il existe des outils open-source de bonne qualité. Le référentiel open source de prédilection étant Github, c'est celui que nous utiliserons dans ce TP.

 **- Automatiser la phase du build**

Transformer du code source en un système opérationnel peut souvent être un processus compliqué impliquant la compilation, le déplacement de fichiers, le chargement de schémas dans les bases de données, etc. Cependant, comme la plupart des tâches de cette partie du développement logiciel, ce processus peut être automatisé et devrait l'être. Demander à des personnes de taper des commandes étranges ou de cliquer sur des boîtes de dialogue est une perte de temps et un terrain propice aux erreurs.On doit donc s'assurer de pouvoir construire et lancer notre système à l'aide de ces scripts en utilisant une seule commande.
 
  **- Rendre notre build auto testable**
  
Traditionnellement, une compilation signifie compiler, lier et tout ce qui est nécessaire pour qu'un programme s'exécute. Un programme peut s'exécuter, mais cela ne signifie pas qu'il fait ce qu'il faut. Les langages modernes à typage statique permettent de détecter de nombreux bogues, mais beaucoup d'autres passent à travers les mailles du filet.

Un bon moyen de détecter les bogues plus rapidement et plus efficacement est d'inclure des tests automatisés dans le processus de construction.Ce que nous ferons un peu plus bas.

  
**- Tout le monde commit sur le main chaque jours**

Comme vu en cours le devops c'est plus que des outils, "c'est une philosophie" et également un ensemble de bonnes pratiques parmi lesquelles figure la communication au sein de l'équipe.  L'intégration est avant tout une question de communication. L'intégration permet aux développeurs d'informer les autres développeurs des modifications qu'ils ont apportées. Une communication fréquente permet aux gens d'être informés rapidement de l'évolution des changements.

La seule condition préalable pour qu'un développeur s'engage sur le main est qu'il puisse construire correctement son code. Cela implique, bien sûr, de réussir les tests de compilation. Comme pour tout cycle de validation, le développeur met d'abord à jour sa copie de travail (sa branche), pour qu'elle corresponde à la branche main, résout les éventuels conflits avec la ligne principale, puis construit sur sa machine locale. Si la compilation est réussie, il est alors libre de valider la version principale.
En procédant fréquemment de la sorte, les développeurs découvrent rapidement s'il existe un conflit entre deux développeurs.

    
**- Chaque 'Commit' doit enclencher un Build sur la machine d'intégration**
    
 Fix Broken Builds Immediately

**- Rendre rapide l'étape du build **
    
**- Tester dans un Clone de l'environnement de production **
    
 **- Permettre à tout le monde d'obtenir facilement le dernier executable **
    
**- Tous les développeur doivent être en mesure de voir ce qui se passe**
    
**- Automatiser le déploiement  **






# 3 - Présentation et mise en place des outils 

- [x] Bazel, Build and test software: C'est un outil de contruction et de tests de logiciels open source. Il est généralement utilisé par les grandes entreprises qui réalisent des projet monorepo. On l'utilisera malgré tout dans notre cas afin de le découvrir et de voir quelle sont les champs des posibilités qu'il offre a notre projet.

- [x] Test Container: Testcontainers est une bibliothèque qui prend en charge les tests, en fournissant des instances légères et jetables de bases de données courantes, de navigateurs Web Selenium, ou de tout autre élément pouvant fonctionner dans un conteneur Docker.

- [x] SonarQube: SonarQube est une plateforme open-source pour l'inspection continue de la qualité du code. Elle fournit des outils pour analyser le code à la recherche de bogues, de vulnérabilités et d'odeurs de code, ainsi que des métriques pour mesurer la qualité du code et en assurer le suivi dans le temps. SonarQube prend en charge un large éventail de langages de programmation, notamment Java, C#, JavaScript, PHP, Python, etc.

SonarQube peut être intégré à votre pipeline d'intégration continue et de livraison continue (CI/CD) pour analyser automatiquement la qualité du code dans le cadre de votre processus de construction. Il peut également être utilisé par les développeurs pour effectuer une analyse locale du code et recevoir un retour sur la qualité du code avant de valider les modifications.

Outre l'analyse du code, SonarQube fournit également des tableaux de bord et des rapports pour vous aider à visualiser les tendances en matière de qualité du code, à suivre les progrès et à identifier les domaines à améliorer. Il s'intègre également à d'autres outils tels que Git, Jenkins et les IDE afin d'offrir une expérience transparente aux développeurs.

Dans l'ensemble, SonarQube est un outil puissant qui permet d'améliorer la qualité du code et de s'assurer que votre base de code est maintenable, évolutive et sécurisée.




