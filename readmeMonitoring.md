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

#### Configuration de Prometheus 
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


Dans le dossier "docker-grafana", nous créons un fichier "docker-compose.yml", le nom de ce fichier ne peut être modifié. Nous implémentons le code suivant : 
```
    version: '3'

    volumes:
    prometheus-data:
        driver: local
    grafana-data:
        driver: local

    services:
    prometheus:
        image: prom/prometheus:latest
        container_name: prometheus
        ports:
        - "9090:9090"
        volumes:
        - ./prometheus:/etc/prometheus
        - prometheus-data:/prometheus
        restart: unless-stopped
        command:
        - '--config.file=/etc/prometheus/prometheus.yml'
        - '--storage.tsdb.path=/prometheus'
        - '--storage.tsdb.retention.time=365d'


    grafana:
        image: grafana/grafana:latest
        container_name: grafana
        ports:
        - "6060:3000"
        volumes:
        - grafana-data:/var/lib/grafana
        restart: unless-stopped

    node_exporter:
        image: quay.io/prometheus/node-exporter:latest
        container_name: node_exporter
        command:
        - '--path.rootfs=/host'
        pid: host
        restart: unless-stopped
        volumes:
        - '/:/host:ro,rslave'
```
Nous observons la catégorie volume qui correspond au stockage de nos informations récoltées. La catégorie services permet de configuré les différents outils dont nous aurons besoin. 

#### Mise en place de prometheus et grafana
Pour commencer, il faut lancer le projet avec docker, ici nous nous plaçons dans l'API et nous utilisons la commande suivante : 
`sudo docker-compose up -d`

Nous nous plaçons dans "docker-grafana", et nous réalisons de nouveau la même commande. 

Nous allons maintenant à l'adresse : "http://localhost:9090/", nous arrivons sur la page de prometheus. 
![Image de prometheus](prometheus.png)
### Analyse de résultats





