# DevOps : monitoring, logging, ...

Ce projet s'appuie sur l'application créée en cours de développement web du premier semestre et conteneurisé en cours d'architecture logiciel.
Nous avons décidé de créer 3 branches différentes afin de pouvoir partir sur 3 possibilités différentes et nous repartir la charge de travail :

  - grafana_metrics : permet d'affichier via grafana des metriques concernant l'utilisation de la machine par le projet
  - timeResponse : permet d'afficher dans la console le temps mis par les appels du front vers le back.
  - ??? : TODO

Chaque branche dispose d'un readme expliquant plus en détail ses fonctionnalités.

# Fonctionnement

Afin de correctement faire fonctionner le projet, nous avons dû grandement le modifier dans sa structure. Ainsi, certains bugs sont présents et les fonctionnalités initiales du projet ne sont plus toutes fonctionnelles.

Pour lancer le projet, il faut lancer le docker compose puis se connecter sur le localhost:80.
On peut ensuite créer un utilisateur en cliquant sur Register, puis se connecter en cliquant sur login (il est impératif de créer un utilisateur avant de se connecter, car la BDD est vide lors du lancement du projet).
