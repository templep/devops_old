terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.1"
    }
  }
}

provider "docker" {}

// --- Docker Network -----------------------------------------------------------------------------

// Network for all dockers
resource "docker_network" "network" {
  name = "mynet"
  ipam_config {
    subnet = "177.22.0.0/24"
  }
}

// --- Dockers Volume ------------------------------------------------------------------------------

// Volume for MySQL
resource "docker_volume" "volumeMySQL" {
  name = "volumeMySQL"
}

// Volume for RabbitMQ
resource "docker_volume" "volumeRabbitMQ" {
  name = "volumeRabbitMQ"
}

// --- MySQL DataBase -----------------------------------------------------------------------------

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

// --- Backend Web --------------------------------------------------------------------------------

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

// --- Frontend Web -------------------------------------------------------------------------------

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

// --- RabbitMQ -----------------------------------------------------------------------------------

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

// --- Quarkus ------------------------------------------------------------------------------------

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

// --- Locust -------------------------------------------------------------------------------------

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

// --- Prometheus ---------------------------------------------------------------------------------

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

// --- Grafana ------------------------------------------------------------------------------------

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

// --- Nginx : Reverse Proxy ----------------------------------------------------------------------

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
