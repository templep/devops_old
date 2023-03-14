# Tutoriel mise en place d'un outil d'infrastrucure as code

Avant qu'est-ce qu'un outil d'infrastructure as code ? Il s'agit de framework permettant de mettre en place l'ensemble des serveurs, des micro-services, des base de données, etc via un code, et non via un terminale.

Par exemple, pour mettre en place un site internet, avec une base de données et un pare-feu. Il faut d'abords créer et lancer une base de données via les commandes MySQL, en définissant le port, les identifiants et une table par défaut. Puis créer un serveur http, par exemple avec Apache. Et enfin configurer le pare-feu via la commandes "iptables".
Toute ces étapes sont longues et difficilement répétables. On peut penser à faire un script bash par exemple mais ça rend la tache très complexe.

C'est ici que les outils d'infrastructure as code sont très pratiques. Ils vont permettrent d'effectuer ces étapes de déploiment en les décrivants dans un code. Il sera donc très aisé de répéter toute ces étapes dans un nouvel environnement où l'application doit être déployé.

Très bien, mais quel framework choisir ?

## 1 - Choix du Framework

Il existe de nombreux framework d'infrastrucutre as code. Parmis les plus connus on peut citer :
- Ansible
- Terraform
- Puppet
- Chef
- Et bien d'autres encore ...

Pour ce tutoriel, nous avons choisi de travailler avec Terraform car c'est un framework très populaire, bien documenté, open-source et assez simple à prendre en main.

## 2 - Choix du projet

Pour ce tutoriel, nous avons repris un projet dévellopé en cours d'AL. Il s'agit d'un site web pour gérer des associations. Ce projet est composé de plusieurs micro-services,  parmis eux :

- Un backend
- Un frontend
- Une base de données
- Un projet Quarkus
- Une queue RabbitMQ
- Un framework de test : Locust
- Un serveur de monitoring : Prometheus
- Un serveur de visualisation de données : Grafana
- Et un reverse proxy Nginx

L'ensemble de ces micro-services sont déployés sur des dockers et tous ces docker sont gérés par un docker-compose.

Lien du projet initial : https://github.com/Thomega35/TP1_WEB/tree/DockerKiki

L'objectif va donc être de mettre en place ce projet avec Terraform pour remplacer le docker-compose.

## 3 - Installation de Terraform

L'installation de Terraform va dépendre du système d'exploitation. Vous pouvez retrouver les instructions d'installation sur le site officiel : https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli

## 4 - Création du projet Terraform

Une fois Terrform installé, créez un dossier pour votre projet Terraform. Dans ce dossier, créez un fichier *main.tf*. Ce fichier va contenir l'ensemble des instructions pour déployer votre projet.

Dans notre exemple, il faut clone le projet, créer un dossier *Terraform* et y mettre le fichier *main.tf*.

## 5 - Mise en place des micro-services

Terrform fonctionne avec des `providers`. Un provider permet de définir les `ressources` que l'on souhaite déployer. Ici il y aura un provider principale : Docker.

Commençons à écrire dans le fichier *main.tf* :

```terraform

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.1"
    }
  }
}

```

Ce code permet de récupérer le provider Docker en ligne.

```terraform
provider "docker" {}
```

Et ensuite, on déclare le provider Docker.

Cela étant fait, on peut désormais utiliser les `resource` Docker

Maintenant dans les parties suivantes nous allons :

- (5.1) Créer un réseau Docker pour lier les containers entre eux.

- (5.2) Créer deux volumes Docker pour stocker les données de la base de données et de RabbitMQ.

- (5.3) Ecrire le code de déploiment de chaque micro-service Docker.

    Cela ce fait en deux parties :

        - Création de l'image Docker

        - Création du container Docker

### 5.1 - Docker Network

La création d'un réseau Docker se fait de la manière suivante :

```terraform
// Network for all dockers
resource "docker_network" "network" {
  name = "mynet"
  ipam_config {
    subnet = "177.22.0.0/24"
  }
}

```

On créer une ressources Docker Network, on lui donne un nom et une IP.

*La précision de l'IP est purrement accesoire*

Grâce à ce réseau, les containers pourront communiquer entre eux. Il suffira de préciser le nom du réseau (*mynet*) pour chaque container.

### 5.2 - Docker Volume

Un volume sert à stocker des données pour qu'elles persistes même si les containers sont supprimés.

Pour les créer, nous utilisons la ressource Docker Volume :

- Volume pour la base de données

```terraform
resource "docker_volume" "volumeMySQL" {
  name = "volumeMySQL"
}
```

- Volume pour RabbitMQ
```terraform
resource "docker_volume" "volumeRabbitMQ" {
  name = "volumeRabbitMQ"
}
```

Ils seront utilisés plus tard dans le code et référencés par leur nom (*volumeMySQL* et *volumeRabbitMQ*).

### 5.3 - Déploiement des micro-services

Pour chaque micro-service, le code sera donné. Cependant le contenu de ces codes relèvent plus du fonctionnement de l'application que de la mise en place de Terraform, il n'y aura d'explication de ces derniers dans ce document mais le ReadMe du projet d'origine donne toute les explications : https://github.com/Thomega35/TP1_WEB/tree/DockerKiki

Aussi l'ensemble de ce projet Terraform peut-être retrouvé dans le dossier : `terraformproject`

#### 5.3.1 - Database

```terraform
resource "docker_image" "mysql_image" {
  name = "mysql"
}

resource "docker_container" "mysql_container" {
  image = docker_image.mysql_image.name
  name  = "database"
  env   = ["MYSQL_DATABASE=test", "MYSQL_ROOT_PASSWORD=admin"]
  volumes {
    container_path = "/var/lib/mysql"
    volume_name    = docker_volume.volumeMySQL.name
  }
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.2 - Backend

```terraform
resource "docker_image" "back_image" {
  name = "kiki2956/back:latest"
}

resource "docker_container" "back_container" {
  image = docker_image.back_image.name
  name  = "back"
  depends_on = [
    docker_container.mysql_container
  ]
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.3 - Frontend

```terraform
resource "docker_image" "front_image" {
  name = "kiki2956/front:latest"
}

resource "docker_container" "front_container" {
  image = docker_image.front_image.name
  name  = "front"
  depends_on = [
    docker_container.back_container
  ]
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.4 - RabbitMQ

```terraform
resource "docker_image" "rabbitmq_image" {
  name = "rabbitmq:3-management-alpine"
}

resource "docker_container" "rabbitmq_container" {
  image = docker_image.rabbitmq_image.name
  name  = "rabbitmq"
  env   = ["RABBITMQ_DEFAULT_USER=mailuser", "RABBITMQ_DEFAULT_PASS=mailpassword"]
  volumes {
    container_path = "/var/lib/rabbitmq"
    volume_name    = docker_volume.volumeRabbitMQ.name
  }
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.5 - Quarkus

```terraform
resource "docker_image" "quarkus_image" {
  name = "kiki2956/quarkus-natif"
}

resource "docker_container" "quarkus_container" {
  image = docker_image.quarkus_image.name
  name  = "quarkus"
  depends_on = [
    docker_container.rabbitmq_container
  ]
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.6 - Locust

```terraform
resource "docker_image" "locust_image" {
  name = "locustio/locust"
}

resource "docker_container" "locust_container" {
  image   = docker_image.locust_image.name
  name    = "locus"
  command = ["-f", "/mnt/locust/locustfile.py", "--host=http://back:3000"]
  depends_on = [
    docker_container.back_container
  ]
  volumes {
    container_path = "/mnt/locust/"
    read_only      = false
    host_path      = "${path.cwd}/../Locust/Data/"
  }
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.7 - Prometheus

```terraform
resource "docker_image" "prometheus_image" {
  name = "prom/prometheus"
}

resource "docker_container" "prometheus_container" {
  image   = docker_image.prometheus_image.name
  name    = "prometheus"
  command = ["--config.file=/etc/prometheus/prometheus.yml", "--web.external-url=/prometheus/", "--web.route-prefix=/"]
  volumes {
    container_path = "/etc/prometheus/"
    read_only      = false
    host_path      = "${path.cwd}/../Prometheus/"
  }
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.8 - Grafana

```terraform
resource "docker_image" "grafana_image" {
  name = "grafana/grafana-enterprise"
}

resource "docker_container" "grafana_container" {
  image = docker_image.grafana_image.name
  name  = "grafana"
  volumes {
    container_path = "/etc/grafana/grafana.ini"
    read_only      = false
    host_path      = "${path.cwd}/../Grafana/grafana.ini"
  }
  networks_advanced {
    name = docker_network.network.name
  }
}
```

#### 5.3.9 - Nginx
    
```terraform
resource "docker_image" "nginx_image" {
  name = "kiki2956/nginx:latest"
}

resource "docker_container" "nginx_container" {
  image = docker_image.nginx_image.name
  name  = "nginx"
  ports {
    internal = 80
    external = 80
  }
  depends_on = [
    docker_container.back_container,
    docker_container.front_container,
    docker_container.locust_container,
    docker_container.prometheus_container,
    docker_container.grafana_container
  ]
  networks_advanced {
    name = docker_network.network.name
  }
}
```

## 6 - Execution du projet

Maintenant que le `main.tf` est prêt, il ne reste plus qu'à lancer le projet.

On commence par initialiser le projet Terraform :

```bash
terraform init
```

Ensuite on peut valider la bonne configuration du projet :

```bash
terraform validate
```

Puis on peut formater le code :

```bash
terraform fmt
```

