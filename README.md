# DevOps : monitoring, logging, ...

Le monitoring es un processus de collecte et d'analyse de données. Il permet d'observer différents aspects comme la performance, le comportement, l'utilisation ou même la sécurité d'un système. Ces observations se font sur des indicateurs de performances comme le temps de réponse, les fuites de mémoires ou encore les logs d'executions.

Dans le cadre des pratiques DevOps, le monitoring intervenient apres la mise en opération du système. Il est necessaire pour effectuer une surveillance continue ce qui permet à  l'equipes de productions de faire un retour à l'équipe de développement, faire apparaitre de potentiels disfonctionnement, incompatibilités ou bugs du système dans son environement de production. 

Dans cette pull request, nous allons vous montrer divers façons de mettre en place des techniques de monitoring. Nous verrons comment faire de l'extraction de temps de réponse d'un backend, comment créer un recupérateur de logs avec Fluentd aini que la mise en forme d'informations avec prometheus et grafana. Pour ce faire, nous avons choisis de nous appuyer sur l'application créée en cours de développement web du premier semestre et conteneurisé en cours d'architecture logiciel.

# Mise en place du monitoring perso

# Collecte de logs Docker avec Fluentd

# Affichage de metriques avec grafana

## Présentation
Cette solution montre comment mettre en place une collecte ainsi qu'un afichage de metriques afin de visualiser l'impacte du système sur la machine hôte. Pour ce faire, nous allons utiliser deux outils très courants et compatibles, prometheus et grafana. 

Pormetheus est un outils open source de collecte et de gestion de metriques en temps réel. Pometheus est basé sur des series temporelles, il interoge des endpoints en exposants des metriques à temps réguliers en minimisant le risque de perturbation (méthode du "pull"). Prometheus offre un grand nombre de compatibilité avec divers langages, systèmes d'éxpoitations ou outils de visualisation comme grafana. Grafana quand à lui, est une plateforme de visualisation de données open source qui permet de créer des tableaux de bords peronalisés provenant de divers types de sources (prometheus, elasticsearch, graphite, etc). Ses tableaux de bords permetent notement la visalisation de series temporelles, ce qui s'avère tres utile dans le cadre du monitoring.

![](./dashboard.png)

## Mise en place
Pour commencer, on crée un dossier qui contiendra le docker compose de la nouvelle stack de monitoring. Ce [docker compose](./dockerComposer_grafana/docker-compose.yaml) contient les services prometheus qui va venir scrapper les données à interval régulier ainsi que grafana, qui va venir mettre en forme les données pour l'affichage (même si prometheus peut aussi faire de l'affichage, mais grafana est plus agréable pour les yeux selon nous).

Promethus seul dans son conteneur ne peux pas fonctionner pleinement, il lui faut un fichier de configuration, on place donc un fichier [prometheus.yml](./dockerComposer_grafana/prometheus/prometheus.yml) dans un nouveau répertoire (dans le dossier du docker compose) dans lequel on va venir taper la configuration choisie (ici, celle à defaut de la doc prometheus).

On peut alors lancer la stack avec la commande :

```shell
sudo docker-compose up -d
```

Il reste maintenant à configurer la liason entre prometheus et grafana. Tout d'abord, il faut se connecter dans le [localhost://6060](localhost://6060). Les login et mot de passes à défaut de grafana sont admin/amdin (le mot de passe sera changé à la première connexion). On arrive alors sur l'interface d'acceuil de grafana, cliquez alors sur "Add your first datasource", selectionnez prometheus. Il sera alors demandé de renseigner l'url de prometheus. Comme nous avons un docker compose, nous pouvons passer par l'ip du network, pour la trouver, il faut taper la commande :

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' prometheus
```

⚠️ ne pas oublier de mettre le port 9090 à la suite de l'ip et le http:// avant

Cliquez sur "save and test" pour sauvegarder la source. On peut alors retourner sur l'aceuill grafana et créer le dashboard. Pour cela, il faut cliquer sur la flèche à coté du logo en haut à gauche puis dashboard>import. On a choisi d'utiliser un dashboard venant de la connumauté car prometheus utilise un node_exporter qui est très compatible avec un [dashborad](https://grafana.com/grafana/dashboards/1860-node-exporter-full/) provenant de grafana labs. On entre donc l'id 1860, on séléctionne la source crée précédmeent puis on valide. On arrive alors sur un dashboard donnant plusieurs informations sur l'utilisation de la machine extraites par prometheus.

## Remarques / recul
Au travers de la mise en place de cette stack d'outils, nous avons pu nous rendre compte de certaines de ses limites. Tout d'abbord, comme cette stack vient observer la machine sur laquelle evolue le système, elle doit se trouver de préférence sur une autre machine, afin de ne pas introduire du bais dans la serie temporelle. De plus, la methode du "pull" de prometheus minimise l'impact sur le comportement du système mais à quand même un effet, ce qui n'est pas à negliger sur des machines peu puissantes.
Comme souvent dans le DevOps, ces pratiques sont à adapter au contexte du projet, de l'environement de productions et aux besoins du clients. Des compromis doivent être faits en fonction de chaque projet afin de tirer au mieux parti des avantages tout en ayant une quantité acceptable d'inconveniants.

# Fonctionnement

Afin de correctement faire fonctionner le projet, nous avons dû grandement le modifier dans sa structure. Ainsi, certains bugs sont présents et les fonctionnalités initiales du projet ne sont plus toutes présentes.

Pour lancer le projet, il faut lancer le docker compose puis se connecter sur le localhost:80.
On peut ensuite créer un utilisateur en cliquant sur Register, puis se connecter en cliquant sur login (il est impératif de créer un utilisateur avant de se connecter, car la BDD est vide lors du lancement du projet).
