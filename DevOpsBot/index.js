import { Client, GatewayIntentBits } from 'discord.js';
import { createDB, addTask, getTasks, deleteTask, finishTask } from './toDoList.js';
import { creerCalendrier, ajouterEvenement, supprimerEvenement, verifierEvenement, afficherEvenements } from './calendrier.js';
import { newMember, deleteMembers, getFullName } from './membres.js';

const token = 'INSERT_TOKEN_HERE';


const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.DirectMessageReactions,
   ]
})


client.on('ready', async () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

//Lorsque le bot se connecte au serveur il crée le channel "nouveau-membre"
client.on('guildCreate', guild => {
   guild.channels.create('nouveau-membre', {
      type: 'text'
   })
      .then(channel => console.log(`Created new channel ${channel}`))
      .catch(console.error);
});

//une personne rejoint le serveur
client.on('guildMemberAdd', member => {
   member.guild.channels.cache.find(channel => channel.name === 'nouveau-membre')
      .send(`Bienvenue sur notre serveur Discord, ${member.user.tag} ! Veuillez entrer votre nom et prénom dans le channel nouveau-membre.`);
});

//Une personne quitte le serveur
client.on('guildMemberRemove', member => {
   deleteMembers(member.user.username);
   console.log(`${member.user.tag} has left the server`);
});

//Commande pour les nouveaux membres
client.on('messageCreate', async message => {
   //savoir si l'auteur du message est le créateur du serveur

   if (message.author.bot) return; // Ignore bots

   const index = message.content.indexOf(' ');
   const firstPart = message.content.substring(0, index);
   const secondPart = message.content.substring(index + 1);

   if (message.content === '!help') {
      message.reply('Voici les commandes disponibles : \n !createToDoList : Crée la ToDoList \n !addTask : Ajoute une tâche à la ToDoList \n !getTasks : Affiche la ToDoList \n !deleteTask : Supprime une tâche de la ToDoList \n !finishTask : Termine une tâche de la ToDoList \n !createCalendar : Crée le calendrier \n !addEvent : Ajoute un évènement au calendrier \n !deleteEvent : Supprime un évènement du calendrier \n !checkEvent : Vérifie si un évènement est dans le calendrier \n !getEvents : Affiche les évènements du calendrier \n !register : Enregistre un nouveau membre \n !getFullName : Affiche le nom et prénom d\'un membre');
   }

   if (message.channel.name === 'nouveau-membre' && firstPart === '!register') {
      newMember(message.author.username, secondPart);
      message.reply('Vous êtes bien enregistré !');
   }
});


let isname = "";
client.on('messageCreate', async message => {

   isname = await getFullName(message.author.username);

   if (getFullName != "" && message.author.bot === false) {
      if (message.author.bot) return; // Ignore bots

      const index = message.content.indexOf(' ');
      const firstPart = message.content.substring(0, index);
      const secondPart = message.content.substring(index + 1);

      //Toutes les commandes en lien avec la toDoList
      if (message.content === '!createToDoList' && message.author.id === message.guild.ownerId) {
         try {
            await createDB();
            message.reply('ToDoList créée avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de la création de la ToDoList.');
         }
      }

      if (firstPart === '!addTask') {
         try {
            await addTask(secondPart);
            message.reply('Tâche ajoutée avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de l\'ajout de la tâche.');
         }
      }

      if (message.content === '!getTasks') {
         try {
            const list = await getTasks();
            message.reply(list);
         } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de la récupération des tâches.');
         }
      }

      if (firstPart === '!deleteTask') {
         try {
            await deleteTask(secondPart);
            message.reply('Tâche supprimée avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de la suppression de la tâche.');
         }
      }

      if (firstPart === '!finishTask') {
         try {
            const date = new Date(); // Créer un objet Date représentant la date et l'heure actuelles
            const day = date.getDate().toString().padStart(2, '0'); // Obtenir le jour et le formater avec un zéro en tête si nécessaire
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtenir le mois et le formater avec un zéro en tête si nécessaire
            const year = date.getFullYear().toString().substr(-2); // Obtenir l'année et extraire les deux derniers chiffres
            const formattedDate = `${day}.${month}.${year}`; // Concaténer les parties de la date dans le format souhaité

            let fullName = await getFullName(message.author.username);

            await finishTask(secondPart, formattedDate, fullName);
            message.reply('Tâche terminée avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de la finition de la tâche.');
         }
      }

      //Toutes les commandes en lien avec le calendrier
      const args = message.content.split(" ");
      if (message.content === '!createCalendar' && message.author.id === message.guild.ownerId) {
         creerCalendrier();
         message.reply('Calendrier créé avec succès!');
      }

      if (firstPart === '!addEvent') {
         try {
            const date = args[1];
            const heureDebut = args[2];
            const heureFin = args[3];
            const titre = args.slice(4).join(" ");
            console.log(date + " " + heureDebut + " " + heureFin + " " + titre);
            ajouterEvenement(date, heureDebut, heureFin, titre);
            message.reply('Événement ajouté avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Erreur lors de l\'ajout de l\'événement. Veuillez réessayer plus tard.');
         }
      }

      if (firstPart === '!deleteEvent') {
         try {
            supprimerEvenement(secondPart);
            message.reply('Événement supprimé avec succès!');
         } catch (error) {
            console.error(error);
            message.reply('Erreur lors de la suppression de l\'événement.');
         }
      }

      if (firstPart === '!checkEvent') {
         try {
            const date = args[1];
            const heure = args[2];
            const result = await verifierEvenement(date, heure);
            message.reply(result);
         } catch (error) {
            console.error(error);
            message.reply('Erreur lors de la vérification de l\'événement.');
         }
      }

      if (message.content.startsWith('!getEvents')) {
         try {
            const dateDebut = args[1];
            const dateFin = args[2];
            const list = await afficherEvenements(dateDebut, dateFin);
            message.reply(list);
         } catch (error) {
            console.error(error);
            message.reply('Erreur lors de la récupération des événements.');
         }
      }


      if (message.content === '!members') {
         message.reply(`Il y a ${message.guild.memberCount} membres sur le serveur !`)
      }

      if (firstPart === '!getFullName') {
         let fullName = await getFullName(secondPart);
         message.reply(fullName);
      }

   }



   else if (message.author.bot === false) {
      message.reply('Vous ne pouvez pas écrire dans ce channel ! Veuillez vous rendre dans le channel nouveau-membre pour vous enregistrer !');
      setTimeout(() => {
         message.delete();
      }, 500);
   }
});


client.login(token);
