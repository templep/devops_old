# DevOps_Tuto

# **Intégration continue, Analyse statique et Automatisation des tests**

## **Description**
Ce tutoriel entre dans le cadre des travaux pratiques du cours de DevOps vu en ESIR 2 (SI).

Dans ce dernier, nous réaliserons au sein d'un projet au choix, toute la démarche d'intégration continue, d'analyse statique et d'automatisation des tests.
Nous avons pour ce faire à notre disposition toute une flopée d'outils (chacun entrant dans une catégorie)

# Sommaire

- [1 - Présentation du projet](#1---présentation-du-projet)

- [2 - Intégration Continue](#2---intégration-continue)

- [3 - Présentation des outils](#3---présentation-des-outils)

- [4 - Mise en place des outils](#4---mise-en-place-des-outils)

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


L'intégration continue est une pratique de développement logiciel dans laquelle les membres d'une équipe intègrent leur travail fréquemment, en général chaque personne intègre au moins une fois par jour - ce qui conduit à plusieurs intégrations par jour. Chaque intégration est vérifiée par une construction automatisée (y compris un test) afin de détecter les erreurs d'intégration le plus rapidement possible. De nombreuses équipes estiment que cette approche permet de réduire considérablement les problèmes d'intégration et de développer plus rapidement des logiciels cohérents.





# 3 - Présentation des outils

- [x] Bazel, Build and test software: C'est un outil de contruction et de tests de logiciels open source. Il est généralement utilisé par les grandes entreprises qui réalisent des projet monorepo. On l'utilisera malgré tout dans notre cas afin de le découvrir et de voir quelle sont les champs des posibilités qu'il offre a notre projet.

- [x] Test Container: Testcontainers est une bibliothèque qui prend en charge les tests, en fournissant des instances légères et jetables de bases de données courantes, de navigateurs Web Selenium, ou de tout autre élément pouvant fonctionner dans un conteneur Docker.

- [x] SonqrQube: SonarQube est une plateforme open-source pour l'inspection continue de la qualité du code. Elle fournit des outils pour analyser le code à la recherche de bogues, de vulnérabilités et d'odeurs de code, ainsi que des métriques pour mesurer la qualité du code et en assurer le suivi dans le temps. SonarQube prend en charge un large éventail de langages de programmation, notamment Java, C#, JavaScript, PHP, Python, etc.

SonarQube peut être intégré à votre pipeline d'intégration continue et de livraison continue (CI/CD) pour analyser automatiquement la qualité du code dans le cadre de votre processus de construction. Il peut également être utilisé par les développeurs pour effectuer une analyse locale du code et recevoir un retour sur la qualité du code avant de valider les modifications.

Outre l'analyse du code, SonarQube fournit également des tableaux de bord et des rapports pour vous aider à visualiser les tendances en matière de qualité du code, à suivre les progrès et à identifier les domaines à améliorer. Il s'intègre également à d'autres outils tels que Git, Jenkins et les IDE afin d'offrir une expérience transparente aux développeurs.

Dans l'ensemble, SonarQube est un outil puissant qui permet d'améliorer la qualité du code et de s'assurer que votre base de code est maintenable, évolutive et sécurisée.




