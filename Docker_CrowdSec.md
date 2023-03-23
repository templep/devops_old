### Docker Compose

Afin que CrowdSec soit déployé sur tout les plateforme un docker compose est disponible [ici](https://github.com/crowdsecurity/example-docker-compose).

> Prérequis : 
> 
> Avoir installé Docker*
> 
> Avoir installé Docker Compose


Pour utiliser cette solution rien de plus simple :

```bash
git clone https://github.com/crowdsecurity/example-docker-compose.git
cd example-docker-compose
docker-compose up -d
```

Nous pouvons voir les images instalées : 

```bash
docker ps
CONTAINER ID   IMAGE                                   COMMAND                  CREATED          STATUS          PORTS                                       NAMES
7468ac79dffe   example-docker-compose-main-dashboard   "/app/run_metabase.sh"   30 minutes ago   Up 30 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   example-docker-compose-main-dashboard-1
0b6e76e003dc   crowdsecurity/crowdsec:v1.2.0           "/bin/sh -c '/bin/sh…"   30 minutes ago   Up 30 minutes                                               example-docker-compose-main-crowdsec-1
3d31e89d338a   nginx:alpine                            "/docker-entrypoint.…"   30 minutes ago   Up 30 minutes   0.0.0.0:8000->80/tcp, :::8000->80/tcp       example-docker-compose-main-reverse-proxy-1
fd6f470abbd5   httpd:alpine                            "httpd-foreground"       30 minutes ago   Up 30 minutes   80/tcp                                      example-docker-compose-main-app-1
```

Pour avoir accès au centre de controle metabase, une fois les docker lancées, se rendre sur [localhost:3000](http://localhost:3000) et utiliser les crédentials suivant : `crowdsec@crowdsec.net` and `!!Cr0wdS3c_M3t4b4s3??`