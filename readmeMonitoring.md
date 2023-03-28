# **Logging- tracing-monitoring-observability**
## Introduction
Ce rapport fait l'objet  de la mise en place et l'utilisation d'outils de journalisation et d'observabilités sur une application Doodle. Pour la réalisation du tutoriel, nous avons fait le choix de suivre un tutoriel sur l'outil Prometheus et un sur grafana.

### Participants
- David KONAN
- Lucas LAHOUGUE
- Noemie LEDET
- Yawa  NYATSIKOR
- Albin SENE

 
### Description du projet utilisé

N'ayant pas manipulé de docker avant ce cours, nous sommes partis de la base d'un projet dockerisé déjà réalisé par Gwendal Jouneaux et Benoît Combemale à l'université de Rennes. 
[Lien du projet doodle utilisé avec documentation](https://github.com/nledet/DevOps)

Ce projet mêle un back et un front permettant l'utilisation d'une plateforme de plannification et de sondage. 

###   Utilisation de Prometheus et Grafana

#### Liens utiles pour le suivi de ce tutoriel
[Tutoriel d'utilisation de Prometheus](https://prometheus.io/docs/prometheus/latest/getting_started/)

[Tutoriel Prometheus et Grafana - Christian Lempa](https://www.youtube.com/watch?v=9TJx7QTrTyo)

#### Mise en place de Prometheus et Grafana
Dans notre projet, nous ajoutons un dossier "docker-grafana", le nom n'est pas important. Dans ce dossier, nous créons un dossier "prometheus", qui lui ne peut-être modifié car il utilise l'outil prometheus. Dans ce dossier "prometheus" nous créons un fichier prometheus.yml contenant le code suivant : 
```
    global:
      scrape_interval: 15s 
    
    scrape_configs:
      - job_name: 'prometheus'
        static_configs:
          - targets: ['localhost:9090']

      - job_name: 'node_exporter'
        static_configs:
          - targets: ['node_exporter:9100']
```
Ce fichier permet la configuration de l'utilisation de prometheus. Nous y retrouvons notamment les intervalles d'executions qui vons nous permettre d'obtenir les courbes lors du monitoring par Grafana. Nous configurons prometheus sur le port 9090 pour nous permettre d'extraire les données. 
### Analyse de résultats





