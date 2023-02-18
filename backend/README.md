# Projet backend

**Ce Projet est un TP de Web Master réalisé sous l'encadrement du professeur Hélène Feuillatre à l'ESIR**

## Que faire pour le lancer?

Rien de plus simple il suffit:

1. De s'assurer d'avoir installer Node package Manager pour ce faire rendez vous sur le site officiel:  https://nodejs.org/en/

2. Ensuite installer Nest via la commande:
    
    - npm i -g @nestjs/cli

3. Ensuite vous pouvez cloner le Repository selon la méthode de votre choix

4. Assurer vous d'installer ses library indispensable au lancement 

    - npm install @nest/common
    - npm install bcrypt 
    - npm install sqlite3

5. Vous pouvez ensuite lancer votre backend  

## Description du projet et du processus de développement

Nous ferons une description briève de notre repertoire de procédure de conception.
Rappelons que pour le developpement du backend, un cahier des charges nous a été soumis. 
Ce dernier spécifiait clairement les API que nous aurions à implémenter.
Nous avons donc, pour chaque classes implémentés les fameux CRUD (Create Retreive Update and Delete).

## Présentation des différentes classes

- La Classe USER: Elle à été la toute première à être implémenter et à subit quelques modifications tout au long du processus notament l'ajout du mot de passe pour faciliter l'authentification.

- Ensuite on a implémenté la Classe Association qui possède pour attributs son nom mais également ses membres qui ne peuvent être que des utilisateurs créé dans la précédente classe. Elle donc liée à la classe USER en terme de membres

- Nous avons également la classe Role. Celle ci est une table d'association entre les users et les associations (tel que nous l'impose le sujet)

- Puis nous avons achevé notre developpement par la classe par la classe minutes 









