# DevOps_Tuto

# **Intégration continue, Analyse statique et Automatisation des tests**

## **Description**
Ce tutoriel entre dans le cadre des travaux pratiques du cours de DevOps vu en ESIR 2 (SI).

Dans ce dernier, nous réaliserons au sein d'un projet au choix, toute la démarche d'intégration continue, d'analyse statique et d'automatisation des tests.
Nous avons pour ce faire à notre disposition toute une flopée d'outils (chacun entrant dans une catégorie)

# Sommaire
[1- Présentation du projet](#Présentationduprojet)

[2- Présentation des pratiques DevOps à mettre en place](#PrésentationdespratiquesDevOpsàmettreenplace)

[3- Mise en place des pratiques DevOps](#MiseenplacedespratiquesDevOps)

## 1- Présentation du projet

Pour ce tutoriel, nous utiliserons un projet réalisé dans le cadre du cours d'Architecture Logiciel.
Ce dernier est composé d'un ensemble de microservices interagissants ensemble.
L'on dispose donc:

- D'un backend chargé de toutes les opérations CRUD (Create, Retreive, Update, Delete) sur les membres des associations. Ce dernier est developpé en **NestJs**;

- D'un frontend naturellement pour l'aspect visuel du site web réalisé en **Angular**;

L'ensemble de ses microservice sont déployés au sein de containers docker.

## 2- Sélection des outils

- [ ] Bazel, Build and test software: C'est un outil de contruction et de tests de logiciels open source. Il est généralement utilisé par les grandes entreprises qui réalisent des projet monorepo. On l'utilisera malgré tout dans notre cas afin de le découvrir et de voir quelle sont les champs des posibilités qu'il offre a notre projet.

Une liste d'outils géniaux pour : l'intégration continue, la livraison continue, l'intégration de logiciels devops;

- [ ] Mutation testing in JS
