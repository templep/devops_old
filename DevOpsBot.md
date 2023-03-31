# <p align="center">Tutoriel : DevOpsBot</p>

## Qu'est-ce que DevOpsBot ?
Notre Bot permet de créer un calendrier et une ToDoList pour aider à gérer la communication dans l'équipe.<br/>

## Comment installer DevOpsBot ?
Dans un premier temps, la personne qui souhaite ajouter le Bot au serveur doit avoir les autorisations nécéssaires pour inviter un membre.<br/>
Ensuite, rendez-vous sur le site Discord pour développeur au lien suivant : https://discord.com/developers/applications  <br/>
Cliquez sur le bouton `New Application` en haut à droite de la page et renseignez le nom `DevOpsBot`.<br/>
Rendez-vous ensuite dans l'onglet `Bot` puis `Add Bot`. <br/>
Dans le paragraphe `Privileged Gateway Intents`, autorisez les 3 Intent. Puis cliquer sur `Save Changes`.<br/>
Récupérez le TOKEN du bot à coté de l'icône et gardez le de côté.<br/>
Rendez vous ensuite dans l'onglet `OAuth2` des settings sur la gauche et cliquez sur `URL Generator`. Dans `Scopes` cochez `bot`, ensuite dans `BOT PERMISSIONS` cochez `Administrator`.<br/>
Copiez l'URL généré puis entrez la dans une nouvelle fenêtre de votre navigateur. Séléctionnez le serveur sur lequel vous souhaitez l'installer et cliquez sur autoriser.<br/>
Le bot est maintenant sur votre serveur Discord mais il n'est pas actif. <br/>
Vous pouvez maintenant clonez le dépot Github du bot de la façon suivante dans le dossier que vous souhaitez : 
git clone https://github.com/Camtax53/DO.git <br/><br/>
Ensuite, rendez-vous dans le fichier `index.js` puis remplacez le contenu de la variable token par votre TOKEN récupéré précédemment.
Lancez le fichier `index.js` à l'aide de la commande `node index.js` dans une invite de commande correspondante à votre dossier où vous avez installé le bot.
Votre Bot est donc héberger en local sur votre ordinateur et sera actif tant que le script n'est pas kill.
> Vous pourriez héberger le bot sur un serveur en ligne pour qu'il tourne 24h/24.

## Comment utiliser DevOpsBot ?

Avant toute chose, pour pouvoir écrire dans le serveur utilsant ce Bot vous devez vous inscrire dans le channel `#nouveau-membre`. Sans cela il sera impossible d'écrire un message dans un channel.

| Commande | Description | Utilisation |
| :------: | :---------: | :---------: | 
|  !register   | permet la création de la ToDoList | `!register [prénom] [nom_famille]`|
| !getFullName | récupère le nom complet de l'utilisateur |`!getFullName [nom_utilisateur]` |

Ainsi, même si votre nom discord est un surnom toute personne pourra savoir qui est son interlocculteur.

Nous avons regroupé la liste des commandes qui permettent de gerer la ToDoList sous la forme d'un tableau:

| Commande | Description | Utilisation | 
| :------: | :---------: | :---------: | 
|  !createToDoList  | permet la création de la ToDoList (seul le propriétaire du serveur peut le faire) | `!createToDoList`|
|   !addTask  | permet l'ajout d'une tâche à la ToDoList |  `!addTask [nom_tâche]`|
| !getTasks   | permet de récupérer toutes les tâches de la ToDoList  |   `!getTasks`|
|   !deleteTask  | permet de supprimer une tâche de la ToDoList  |  `!deleteTask [nom_tâche]`|
|   !finishTask  | permet de changer le statut d'une tâche de la ToDoList |   `!finishTask [nom_tâche]`|

Notre Bot permet aussi de gerer un calendrier, les différentes commandes possibles sont regroupés dans le tableau ci-dessous :

| Commande |  Description | Utilisation |
| :------: | :----------: | :---------: |
| !createCalendar  | permet la création du calendrier (seul le propriétaire du serveur peut le faire) |  `!createToDoList`|
|    !addEvent  | permet d'ajouter un évenement au calendrier |  `!addEvent [date] [heure heure] [nom_evenement]`|
|  !deleteEvent    | permet de supprimer un évenement au calendrier |  `!deleteEvent [nom_evenement]`|
|   !checkEvent  | permet de visualiser si il y a deja un évenement à une certaine heure  |  `!checkEvent [date] [heure] `|
|    !getEvents  | permet de visualiser tout les évenements entre deux dates  | `!getEvents [date] [date]` |

> format heure : 00:00 <br/>
> format date : 2023-03-01
