
- [Scanner Docker](#scanner-docker)
  - [Dockle](#dockle)
  - [Docker Bench For Security](#docker-bench-for-security)


# Scanner Docker 

Pourquoi sécuriser Docker ? Parce que c'est l'environnement de production et du développement. Si Docker est protégé correctement alors le risque d'accident en prod est réduit. 

Il existe de nombreux scanner d'image docker, certain plus complet ou plus simple d'utilisation. Ce sont des scanners statiques, c'est à dire qu'ils vont analyser votre image une fois construite pour vous donner des indications sur les bonnes pratiques ou les failles de sécurité de ces dernières. Nous allons en voir 2. 

## Dockle

Dockle est un scanner d'image open source [Dockle](https://github.com/goodwithtech/dockle#debianubuntu).  

Pour l'installer rien de plus simple, il suffit de prendre l'explication sur leur page officielle, nous allons prendre celle pour Ubuntu. 

```sh
VERSION=$(
 curl --silent "https://api.github.com/repos/goodwithtech/dockle/releases/latest" | \
 grep '"tag_name":' | \
 sed -E 's/.*"v([^"]+)".*/\1/' \
) && curl -L -o dockle.deb https://github.com/goodwithtech/dockle/releases/download/v${VERSION}/dockle_${VERSION}_Linux-64bit.deb
$ sudo dpkg -i dockle.deb && rm dockle.deb
```

Et voila ! Dockle est installé. 
Maintenant il vous suffit de faire un 

```sh
$ sudo docker image ls
```
Ce qui va vous lister toutes vos images Docker présentent sur votre ordinateur. 

Puis vous pouvez en choisir une et faire 
```sh
$ dockle [image name]
```

Vous allez vous retrouverer avec toute une sortie d'information comme par exemple :

```
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
```

Dockle utilise 5 niveaux d'information : FATAL, WARN, INFO, SKIP, PASS, qui est du plus grave au moins grave. 
Il va réussir à pointer les choses qui ne sont pas correctes, cependant il peut ne pas être très verbeux concernant les choses à faire exactement pour fixer les issues. 

Vous trouverez tous les tags que Dockle reconnait [ici](https://github.com/goodwithtech/dockle/blob/master/CHECKPOINT.md)
Vous pouvez avoir les informations en SARIF ou en JSON en sortie avec l'option -f ce qui donne : 
```sh
$ dockle -f sarif [image name]
```
Vous pouvez aussi enregistrer ces informations avec l'option -o

Il serait possible d'intégrer cet outil dans une CI (gitlab par exemple) pour pouvoir analyser directement les images construites dans celle-ci. Ce qui est tout l'intérêt du DevSecOps, c'est d'avoir des techniques automatiques pour faire des scans de sécurités. Si on peut l'intégrer dans une CI pour vérifier que les images construites vont bien être déployées sans aucune faille cela est un point très positif. 

## Docker Bench For Security

[Docker Bench For Security](https://github.com/docker/docker-bench-security)
Un autre scan qui peut être intéressant de faire c'est le Docker Bench for Security parce qu'il ne scan pas que les images. En effet alors que Dockle scan que les images, le docker bench security peut scanner le host, le docker deamon, les images et le conteuneur runtime. 

C'est un simple script shell mais qui ne peut s'éxecuter qu'en local (donc pas CI). 

Pour l'utiliser : 
```sh
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
sudo sh docker-bench-security.sh
```

Ce qui peut vous donner ce type de sortie : 

```
[WARN] 1.1.1 - Ensure a separate partition for containers has been created (Automated)
[INFO] 1.1.2 - Ensure only trusted users are allowed to control Docker daemon (Automated)
[INFO]       * Users: 
[WARN] 1.1.3 - Ensure auditing is configured for the Docker daemon (Automated)
[WARN] 1.1.4 - Ensure auditing is configured for Docker files and directories -/run/containerd (Automated)
[WARN] 1.1.5 - Ensure auditing is configured for Docker files and directories - /var/lib/docker (Automated)
```
Comme pour Dockle on va retrouver différents tags en fonction de l'importance de la faille : WARN, INFO, NOTICE, PASS. Ce scan sera moins efficace pour les images mais pour les autres éléments de docker il peut être très intéressant. Les conseils donnés sont plutôt clairs. 
Un désavantage de ce scan c'est qu'on ne peut pas choisir quel élément ou image scanner, si on le lance on est obligé d'attendre que tout soit scanné. 

Ces 2 scans permettent de faire de l'audit de securité mais aussi du scan de bonne pratique. Certains scans sont dédiés seulement aux bonnes pratiques comme [Hadolin](https://github.com/hadolint/hadolint)

Bien qu'un scan soit déjà un bon début dans la sécurité dans le DevOps cela n'est en rien suffisant, tout d'abord parce que ce sont des scans statiques (donc on ne sait pas si il y a un problème pendant que le conteneur est déployé) et surtout que la sécurité ici est basé que sur les conteneurs, mais on peut aussi trouver des outils pour protéger d'autre élément du cycle DevOps, comme vault pour protéger les crédentials (mot de passe de bdd, les .env, ...). Nous avons essayé de le mettre en place mais il n'était compatible avec aucun de nos projets.
Les scans sont une première étape mais doivent être complétés avec d'autres outils pour couvrir et sécurisés entièrement le cycle DevOps.
