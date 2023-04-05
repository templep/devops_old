# DevOps : monitoring, logging, ...

Le monitoring est un processus de collecte et d'analyse de données. Il permet d'observer différents aspects comme la performance, le comportement, l'utilisation ou même la sécurité d'un système. Ces observations se font sur des indicateurs de performances comme le temps de réponse, les fuites de mémoires ou encore les logs d'exécutions.

Dans le cadre des pratiques DevOps, le monitoring intervient après la mise en opération du système. Il est nécessaire pour effectuer une surveillance continue, ce qui permet à  l'équipe de productions de faire un retour à l'équipe de développement, faire apparaitre de potentiels dysfonctionnements, incompatibilités ou bugs du système dans son environnement de production. 

Dans cette pull request, nous allons vous montrer diverses façons de mettre en place des techniques de monitoring. Nous verrons comment faire de l'extraction de temps de réponse d'un backend, comment créer un récupérateur de logs avec Fluentd, ainsi que la mise en forme d'informations avec prometheus et grafana. Pour ce faire. Nous avons choisi de nous appuyer sur l'application créée en cours de développement web du premier semestre et conteneurisé en cours d'architecture logiciel.

# Mise en place du monitoring personnel
## Présentation
L'objectif de la mise en place de logs personnalisés est de permettre la prise en compte de certains paramètres choisis par les développeurs. Dans notre cas, nous avons choisi de chronométrer le temps qui s'écoule entre le moment où le front-end envoie une requête au back-end, et le moment où le front-end reçoit la réponse.

Il est évidemment possible de mettre en place d'autres logs personnalisés. Par exemple, si l'on souhaite suivre les performances de son site, on peut également mesurer le taux de réussite des requêtes en plus de les chronométrer.

Un autre aspect important est de monitorer les erreurs. Cela va ensuite permettre aux développeurs de plus rapidement les identifier afin de les corriger.

## Mise en place

Dans notre cas, nous avons uniquement mis en place la mesure du temps mis par une requête du front-end vers le back-end. L'avantage du projet est que les appels passaient tous par la classe "api-helper.service.ts" (dossier : front-end\\source\\app\\services). Ainsi, nous avons juste mis en place une fonction "start" chargée de déterminer l'heure à laquelle la requête est effectuée. La fonction "stop" est quant à elle chargée de déterminer le temps écoulé (en connaissant le résultat de "start") et de l'afficher dans la console.

Concernant la gestion d'erreur, nous ne l'avons pas implémentée. Cependant, nestJS offre diverse possibilités. Par exemple, la classe "HttpException" permet de créer des exceptions personnalisées. Il y a également la méthode "useGlobalFilters()" fournie par le module "NestApplication", qui permet de gérer toutes les erreurs de l'application.


## Prise de recul

Bien que la création de logs personnalisés soit très utile pour faire remonter des informations importantes aux développeurs, si ces derniers ne sont pas liés à d'autres outils, ils ne sont pas vraiment utiles. En effet, actuellement, tous les logs et les erreurs sont affichés dans la console du navigateur. Ainsi, il faut impérativement être connecté sur la session courante pour les voir et avoir activé la console (appuyer sur F12).

Dans l'idéal, il faudrait un outil qui lise les logs affichés dans la console pour pouvoir les traiter. C'est-à-dire les faire remonter aux développeurs pour qu'ils puissent les prendre en compte.

Il est aussi nécessaire de produire des logs suffisamment clairs pour que les développeurs puissent avoir toutes les informations nécessaires rapidement. Il faut également les trier afin de n'afficher que les logs qui représentent un réel intérêt pour les développeurs. Par exemple, il n'est pas aussi important de savoir qu'un utilisateur a échouer à se connecter que de savoir que le serveur hébergeant le back-end a planté.


# Collecte de logs Docker avec Fluentd
Dans un contexte DevOps, la collecte des logs est essentielle pour suivre les activités de développement et de déploiement. Dans cette partie, nous allons voir comment utiliser Fluentd pour collecter les logs de nos microservices Docker
## Fluentd

Fluentd est un outil open-source de collecte, de traitement et de diffusion de logs. Il est particulièrement adapté pour collecter les logs provenant de différents types de sources de données, notamment les applications, les serveurs, les bases de données et les conteneurs Docker. Il peut aussi être utilisé pour agréger les logs provenant de différentes sources, les traiter et les diffuser à des outils de monitoring et de visualisation.

## Méthode

Pour utiliser Fluentd pour collecter les logs de nos microservices Docker, nous avons créé un fichier de configuration fluent.conf qui définit les sources et les sorties pour Fluentd. Nous avons ensuite utilisé Docker Compose pour déployer un service Fluentd avec la configuration fluent.conf.


Nous avons ensuite exécuté notre application en utilisant Docker Compose et avons observé les logs collectés par Fluentd dans le répertoire logs.

## Limites

Nous avons constaté que Fluentd peut être difficile à configurer et à utiliser pour les débutants. Il nécessite une compréhension approfondie de la configuration et de la syntaxe pour être utilisé correctement. Nous avons également constaté que l'analyse des logs peut être fastidieuse.

## Conclusion
En conclusion, Fluentd est un outil puissant et polyvalent pour collecter et traiter les logs de nos microservices Docker. Il peut être utilisé pour détecter rapidement les erreurs et les performances lentes et pour agréger les logs provenant de différentes sources. Cependant, son utilisation peut nécessiter une certaine expérience et des connaissances en configuration et en syntaxe.


# Affichage de métriques avec grafana

## Présentation
Cette solution montre comment mettre en place une collecte ainsi qu'un affichage de métriques afin de visualiser l'impacte du système sur la machine hôte. Pour ce faire, nous allons utiliser deux outils très courants et compatibles, prometheus et grafana. 

Prometheus est un outil open source de collecte et de gestion de métriques en temps réel. Prometheus est basé sur des séries temporelles, il interroge des endpoints en exposants des métriques à temps réguliers en minimisant le risque de perturbation (méthode du "pull"). Prometheus offre un grand nombre de compatibilités avec divers langages, systèmes d'exploitations ou outils de visualisation comme grafana. Grafana quant à lui, est une plateforme de visualisation de données open source qui permet de créer des tableaux de bords personnalisés provenant de divers types de sources (prometheus, elasticsearch, graphite, etc). Ses tableaux de bords permettent notamment la visualisation de séries temporelles, ce qui s'avère très utile dans le cadre du monitoring.


## Mise en place
Pour commencer, on crée un dossier qui contiendra le docker compose de la nouvelle stack de monitoring. Ce [docker compose](./dockerComposer_grafana/docker-compose.yaml) contient les services prometheus qui va venir scraper les données à intervalles réguliers, ainsi que grafana, qui va venir mettre en forme les données pour l'affichage (même si prometheus peut aussi faire de l'affichage, mais grafana est plus agréable pour les yeux selon nous).

Prometheus seul dans son conteneur ne peut pas fonctionner pleinement, il lui faut un fichier de configuration, on place donc un fichier [prometheus.yml](./dockerComposer_grafana/prometheus/prometheus.yml) dans un nouveau répertoire (dans le dossier du docker compose) dans lequel on va venir taper la configuration choisie (ici, celle à défaut de la doc prometheus).

On peut alors lancer la stack avec la commande :

Il reste maintenant à configurer la liaison entre prometheus et grafana. Tout d'abord, il faut se connecter dans le [localhost://6060](localhost://6060). Les login et mot de passes à défaut de grafana sont admin/amdin (le mot de passe sera changé à la première connexion). On arrive alors sur l'interface d'accueil de grafana, cliquez ensuite sur "Add your first datasource", sélectionnez prometheus. Il sera alors demandé de renseigner l'URL de prometheus. Comme nous avons un docker compose, nous pouvons passer par l'IP du network, pour la trouver, il faut taper la commande :


⚠️ ne pas oublier de mettre le port 9090 à la suite de l'IP et le http:// avant

Cliquez sur "save and test" pour sauvegarder la source. On peut alors retourner sur l'accueil grafana et créer le dashboard. Pour cela, il faut cliquer sur la flèche à côté du logo en haut à gauche puis dashboard>import. On a choisi d'utiliser un dashboard venant de la communauté, car prometheus utilise un node_exporter qui est très compatible avec un [dashboard](https://grafana.com/grafana/dashboards/1860-node-exporter-full/) provenant de grafana labs. On entre donc l'id 1860, on sélectionne la source crée précédemment, puis on valide. On arrive alors sur un dashboard donnant plusieurs informations sur l'utilisation de la machine extraites par prometheus.

## Remarques / recul
Au travers de la mise en place de cette stack d'outils, nous avons pu nous rendre compte de certaines de ses limites. Tout d'abord, comme cette stack vient observer la machine sur laquelle évolue le système, elle doit se trouver de préférence sur une autre machine, afin de ne pas introduire du biais dans la série temporelle. De plus, la méthode du "pull" de prometheus minimise l'impact sur le comportement du système mais à quand même un effet, ce qui n'est pas à négliger sur des machines peu puissantes.
Comme souvent dans le DevOps, ces pratiques sont à adapter au contexte du projet, de l'environnement de productions et aux besoins du client. Des compromis doivent être faits en fonction de chaque projet afin de tirer au mieux parti des avantages tout en ayant une quantité acceptable d'inconvénients.

# Conclusion

## Détection des erreurs
Dans un contexte de devOps, la collecte et la visualisation des informations d'exécution est primordiale. Elle permet aux développeurs d'avoir conscience des erreurs de leurs logiciels plus rapidement et efficacement, et donc de corriger ces derniers plus rapidement. Ainsi, cela permet d'améliorer l'expérience utilisateur, ou au moins d'éviter de la dégrader.

Par exemple, si l'on constate que le temps de réponse du back-end est trop long par rapport aux tests initialement réalisés, cela signifie qu'il y a un problème avec ce dernier. En le réglant, cela permettrait d'accélérer l'application.

## Amélioration continue
Garder trace des erreurs rencontrées durant un projet, de ce qui les a causées et de comment les régler permet ensuite pour de futurs projets de ne pas tomber dans les mêmes pièges. C'est pourquoi il est nécessaires que les logs produit par le projet soient suffisamment clairs d'une part, mais également pertinent. Un gros projet pouvant facilement générer de très nombreux logs, il est nécessaire de les trier en amont afin de ne conserver que ceux qui représente un réel problème, ou au moins de plus les mettre en avant.

# Post-mortem
Ce projet s'appuie sur l'application créée en cours de développement web du premier semestre et conteneurisé en cours d'architecture logiciel. Afin de correctement faire fonctionner le projet, nous avons dû grandement le modifier dans sa structure. Ainsi, certains bugs sont présents et les fonctionnalités initiales du projet ne sont plus toutes présentes.

Nous aurions dû choisir un projet qui fonctionnait bien dès le départ pour pouvoir directement avancer sur le sujet de DevOps. Compte tenu de l'état de notre projet web/AL au départ, nous avons dû passer beaucoup de temps à le faire correctement fonctionner, et même à la fin certains bugs subsistent.
Le temps que nous avons perdu là, nous aurait été utile pour réussir à faire fonctionner les 3 parties ensembles et pouvoir rendre un réel projet complet autour du monitoring.
