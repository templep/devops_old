# Tutoriel mise en place d'un outil d'infrastrucure as code

Avant qu'est-ce qu'un outil d'infrastructure as code ? Il s'agit de framework permettant de mettre en place l'ensemble des serveurs, des micro-services, des base de données, etc via un code, et non via un terminale.

Par exemple, pour mettre en place un site internet, avec une base de données et un pare-feu. Il faut d'abords créer et lancer une base de données via les commandes MySQL, en définissant le port, les identifiants et une table par défaut. Puis créer un serveur http, par exemple apache. Et enfin configurer le pare-feu via la commandes "iptables".
Toute ces étapes sont longues et difficilement répétables. On peut penser à faire un script bash par exemple mais ça rend la tache très complexe.

C'est ici que les outils d'infrastructure as code sont très pratiques. Ils vont permettrent d'effectuer ces étapes de déploiment en les décrivants dans un code. Il sera donc très aisé de répéter toute ces étapes dans un nouvel environnement où l'application doit être déployé.

Très bien, mais quel framework choisir ?

## Choix du Framework

Il existe de nombreux framework d'infrastrucutre as code