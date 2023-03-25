# DevOps_Tuto

# **Intégration continue, Analyse statique et Automatisation des tests**

## **Description**
Ce tutoriel entre dans le cadre des travaux pratiques du cours de DevOps vu en ESIR 2 (SI).

Dans ce dernier, nous réaliserons au sein d'un projet au choix, toute la démarche d'intégration continue, d'analyse statique et d'automatisation des tests.
Nous avons pour ce faire à notre disposition toute une flopée d'outils (chacun entrant dans une catégorie)

# Sommaire

- [1 - Présentation du projet](#1---présentation-du-projet)

- [2 - Présentation des outils](#2---présentation-des-outils)

# 1 - Présentation du projet

Pour ce tutoriel, nous utiliserons un projet réalisé dans le cadre du cours d'Architecture Logiciel.
Ce dernier est composé d'un ensemble de microservices interagissants ensemble.
L'on dispose donc:

- D'un backend chargé de toutes les opérations CRUD (Create, Retreive, Update, Delete) sur les membres des associations. Ce dernier est developpé en **NestJs**;

- D'un frontend naturellement pour l'aspect visuel du site web réalisé en **Angular**;

L'ensemble de ses microservice sont déployés au sein de containers docker.

![2020-03-02_16-58-11](https://user-images.githubusercontent.com/107374001/226594474-18af22d8-e68e-4ab1-ab1f-41d0a3f90f1c.png)



# 2 - Présentation des outils

- [x] Bazel, Build and test software: C'est un outil de contruction et de tests de logiciels open source. Il est généralement utilisé par les grandes entreprises qui réalisent des projet monorepo. On l'utilisera malgré tout dans notre cas afin de le découvrir et de voir quelle sont les champs des posibilités qu'il offre a notre projet.

- [x] Test Container: Testcontainers for Java is a Java library that supports JUnit tests, providing lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.
Testcontainers make the following kinds of tests easier:
    - Mutation Testing
    - 
