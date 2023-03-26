# Sommaire Cloud Native Application and Microservices

- [I- Introduction](#i-introduction)
    - [I.1- Présentation de l'application "Pet Clinic"](#i1-présentation-de-l-application-pet-clinic)
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

### I.1- Présentation de l'application "Pet Clinic"

L'application "Pet Clinic" est une application de gestion des animaux de compagnie, qui permet aux propriétaires de gérer les informations de leurs animaux de compagnie et de planifier des rendez-vous chez le vétérinaire. L'application est composée de plusieurs services qui communiquent entre eux pour fournir les fonctionnalités suivantes : 

- Gestion des propriétaires
- Gestion des animaux de compagnie
- Gestion des rendez-vous
- Gestion des vétérinaires

### I.2- Objectifs du tutoriel

L'objectif de ce tutoriel est de vous guider à travers le processus de création d'une application de microservices cloud-native à l'aide de Kubernetes et d'Istio. En suivant ce tutoriel, vous allez acquérir les connaissances et les compétences nécessaires pour concevoir une architecture de microservices, containeriser les services, gérer les services avec Istio et utiliser Kubernetes pour l'orchestration des services.

Les principaux objectifs de ce tutoriel sont les suivants :

- Comprendre les principes et les avantages de l'architecture de microservices et de l'utilisation de Kubernetes et Istio pour la gestion de la circulation réseau, la surveillance et l'observabilité.
- Créer des microservices Java simples pour une application Pet Clinic et les regrouper en une pile de microservices.
- Containeriser les microservices avec Docker pour faciliter le déploiement et la gestion.
- Déployer la pile de microservices sur un cluster Kubernetes avec des manifestes Kubernetes.
- Utiliser Istio pour la gestion de la circulation réseau entre les microservices et pour la surveillance et l'observabilité.
- Configurer des outils d'observabilité tels que Grafana, Kiali et Zipkin pour surveiller les performances de l'application.

À la fin de ce tutoriel, vous aurez acquis une compréhension pratique de la création d'une application cloud-native de microservices Java et de son déploiement sur Kubernetes avec Istio.

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

JHipster est un générateur d'application Web qui permet de créer rapidement des applications modernes et performantes. Dans ce tutoriel, nous allons utiliser JHipster pour générer une application "Pet Clinic" avec des microservices en Java. Pour installer JHipster, suivez les étapes ci-dessous :

1. Assurez-vous d'avoir une version de Node.js installée sur votre système. Vous pouvez télécharger la dernière version stable à partir du site officiel : https://nodejs.org/en/download/

2. Ouvrez une invite de commande et tapez la commande suivante pour installer JHipster via npm :
    
    ```npm install -g generator-jhipster```

3. Vérifiez que JHipster est installé en exécutant la commande suivante :
    
    ```jhipster --version```

Maintenant que JHipster est installé, nous pouvons générer notre application "Pet Clinic" avec des microservices en Java.


