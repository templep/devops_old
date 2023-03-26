# Sommaire Cloud Native Application and Microservices

- [I- Introduction](#i-introduction)
    - [I.1- Présentation de l'application "Kaia Vente"](#i1-présentation-de-l-application-pet-clinic)
    - [I.2- Objectifs du tutoriel](#i2---objectifs-du-tutoriel)
- [II- Prérequis](#ii-prérequis)
    - [II.1- Configuration de l'environnement de développement](#ii1-configuration-de-l-environnement-de-développement)
    - [II.2- Outils et technologies nécessaires](#ii2-outils-et-technologies-nécessaires)
- [III- Créer une pile de microservices Java à l'aide de JHipster](#iii-créer-une-pile-de-microservices-java-à-l-aide-de-jhipster)
    - [III.1- Installer JHipster](#iii1-installer-jhipster)
    - [III.2- Générer la pile de microservices avec JHipster](#iii2-générer-la-pile-de-microservices-avec-jhipster)
    - [III.3- Exploration de la structure de la pile de microservices générée](#iii3-exploration-de-la-structure-de-la-pile-de-microservices-générée)
    - [III.4- Démarrer la pile de microservices](#iii4-démarrer-la-pile-de-microservices)
- [IV- Créer un cluster GKE et installer Istio](#iv-créer-un-cluster-gke-et-installer-istio)
    - [IV.1- Créer un cluster GKE](#iv1-créer-un-cluster-gke)
    - [IV.2- Installer Istio sur le cluster](#iv2-installer-istio-sur-le-cluster)
    - [IV.3- Installer des outils d'observabilité](#iv3-installer-des-outils-d-observabilité)
- [V- Déployer la pile de microservices sur GKE](#v-déployer-la-pile-de-microservices-sur-gke)
    - [V.1- Créer des manifestes Kubernetes](#v1-créer-des-manifestes-kubernetes)
    - [V.2- Déployer sur GKE](#v2-déployer-sur-gke)
- [VI- Surveillance et observabilité](#vi-surveillance-et-observabilité)
    - [VI.1-  Accéder à Grafana pour visualiser les métriques](#vi1--accéder-à-grafana-pour-visualiser-les-métriques)
    - [VI.2- Accéder à Kiali pour visualiser la topologie du service mesh](#vi2-accéder-à-kiali-pour-visualiser-la-topologie-du-service-mesh)
    - [VI.3- Accéder à Zipkin pour visualiser les traces des requêtes](#vi3-accéder-à-zipkin-pour-visualiser-les-traces-des-requêtes)
- [VII- Nettoyer le cluster GCP](#vii-nettoyer-le-cluster-gcp)
- [VIII- Conclusion](#viii-conclusion)
    - [VIII.1- Résumé des étapes](#viii1-résumé-des-étapes)
    - [VIII.2- Points forts et points faibles](#viii2-points-forts-et-points-faibles)
    - [VIII.3- Points d'amélioration](#viii3-points-d-amélioration)
- [IX- Références](#ix-références)

## I- Introduction

### I.1- Présentation de l'application "Kaia Vente"

L'application "Kaia Vente" est une application web de vente en ligne de produits électroniques développée avec Java et Spring Boot et basée sur une architecture microservices. C'est une solution complète pour les entreprises souhaitant se lancer dans le commerce électronique, avec des fonctionnalités clés telles :

- La gestion des utilisateurs :  inscription, connexion et gestion de profil
- La gestion du catalogue de produits : recherche, filtres et détails des produits
- Le panier d'achat : ajout ou suppression d'articles, modification des quantités
- La commande avec paiement : passage de commande, paiement et suivi de l'état de la commande.


### I.2- Objectifs du tutoriel

L'objectif de ce tutoriel est de vous guider dans la création et le déploiement d'une application de vente en ligne de produits électroniques basée sur une architecture de microservices cloud-native avec l'utilisation de Kubernetes et Istio. En suivant les étapes de ce tutoriel, vous allez acquérir les connaissances et les compétences nécessaires pour :

- Concevoir une architecture de microservices en Java pour l'application Kaia Vente, avec la gestion de l'authentification, du catalogue de produits, du panier d'achat et des commandes.
- Containeriser les microservices avec Docker pour faciliter le déploiement et la gestion.
- Déployer la pile de microservices sur un cluster Kubernetes à l'aide des manifestes Kubernetes fournis dans le projet.
- Utiliser Istio pour la gestion de la circulation réseau entre les microservices et pour la surveillance et l'observabilité.
- Configurer des outils d'observabilité tels que Grafana, Kiali et Zipkin pour surveiller les performances de l'application.

À la fin de ce tutoriel, vous aurez acquis une compréhension pratique de la création d'une application cloud-native de microservices Java et de son déploiement sur Kubernetes avec Istio, en vous concentrant sur les fonctionnalités clés de l'application Kaia Vente.

## II- Prérequis

### II.1- Configuration de l'environnement de développement

Pour pouvoir suivre ce tutoriel, il est nécessaire de configurer votre environnement de développement. Vous aurez besoin des éléments suivants :

- Un système d'exploitation compatible avec Docker et Kubernetes
- Docker Desktop installé et configuré sur votre machine
- Kubernetes installé sur votre machine. Pour cela, vous pouvez utiliser Minikube ou KinD
- Un éditeur de code tel que Visual Studio Code, IntelliJ IDEA, Eclipse ou tout autre éditeur de code que vous êtes à l'aise d'utiliser.

Si vous n'avez pas encore installé ces éléments sur votre machine, veuillez suivre les instructions appropriées pour votre système d'exploitation avant de continuer avec les sections suivantes de ce tutoriel.

### II.2- Outils et technologies nécessaires

Pour suivre ce tutoriel, vous aurez besoin de plusieurs outils et technologies :

- Java 11
- Maven 3.x
- JHipster 7.x
- Docker Desktop ou un démon Docker en cours d'exécution (pour exécuter les conteneurs Docker)
- Un compte Google Cloud Platform (GCP) pour créer un cluster Kubernetes sur Google Kubernetes Engine (GKE)
- kubectl, l'outil en ligne de commande Kubernetes, installé sur votre machine

## III- Générer la pile de microservices avec JHipster

### III.1- Installer JHipster

JHipster est un générateur d'application Web qui permet de créer rapidement des applications modernes et performantes. Dans ce tutoriel, nous allons utiliser JHipster pour générer une application "Kaia Vente" avec des microservices en Java. Pour installer JHipster, suivez les étapes ci-dessous :

1. Assurez-vous d'avoir une version de Node.js installée sur votre système. Vous pouvez télécharger la dernière version stable à partir du site officiel : https://nodejs.org/en/download/

2. Ouvrez une invite de commande et tapez la commande suivante pour installer JHipster via npm :
    
    ```npm install -g generator-jhipster```

3. Vérifiez que JHipster est installé en exécutant la commande suivante :
    
    ```jhipster --version```

Maintenant que JHipster est installé, nous pouvons générer notre application "Kaia Vente" avec des microservices en Java.

### III.2- Générer la pile de microservices avec JHipster

#### III.2.1- Présentaion et description de l'architecture de l'application "Kaia Vente"

Avant de générer notre application avec JHipster, il est important de comprendre l'architecture de l'application "Kaia Vente". Comme mentionné précédemment, notre application sera basée sur une architecture de microservices.

Plus précisément, nous allons utiliser une architecture en couches avec des microservices qui communiquent entre eux via des API REST. L'architecture de l'application "Kaia Vente" est décrite dans le diagramme ci-dessous :

![Architecture de l'application Kaia Vente](docs/images/kaia-vente-architecture.png)

Cette architecture permet de découpler les différents composants de l'application et de les développer et les déployer indépendamment les uns des autres, ce qui permet une évolutivité horizontale en fonction des besoins. L'architecture en couches permet également de séparer les responsabilités de chaque couche, ce qui facilite la maintenance et l'extension de l'application.

Dans notre application "Kaia Vente", nous aurons les microservices suivants :

- **store** : qui sert de point d'entrée pour l'application. Il est responsable de la gestion de la sécurité et de la redirection des requêtes vers les microservices appropriés.
- **product** : qui gère les produits vendus dans notre magasin en ligne. Il prend en charge les opérations CRUD (Create, Read, Update, Delete) pour les produits, les catégories de produits, les commandes de produits et les articles de commande.
- **invoice** : qui gère le panier d'achat de l'utilisateur. Il prend en charge les opérations CRUD pour les articles du panier d'achat et les commandes.
- **notification** : qui gère les notifications pour les clients. Il prend en charge l'envoi de notifications par e-mail, SMS et colis.

Maintenant que nous avons une compréhension de l'architecture de notre application, nous pouvons passer à la création du fichier app.jdl.

#### III.2.2- Création du fichier app.jdl

Le fichier app.jdl est un fichier de définition de l'application qui décrit les entités de l'application et leurs relations. Il est utilisé par JHipster pour générer les microservices et les entités de l'application.

Pour créer le fichier app.jdl, suivez les étapes ci-dessous :

1. Créez un nouveau répertoire sur votre machine et nommez-le "kaia-vente".

2. Ouvrez le répertoire "kaia-vente" dans votre éditeur de code préféré.

3. Créez un nouveau fichier appelé "app.jdl" dans le répertoire "kaia-vente".

4. Ouvrez le fichier "app.jdl" et collez le code suivant : [app.jdl](docs/app.jdl.md)

#### III.2.3- Générer l'application avec JHipster





