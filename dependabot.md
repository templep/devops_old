# <p align="center">Tutoriel : Dependabot</p>

![image](https://user-images.githubusercontent.com/78076783/229197586-bc54d789-0258-4f37-8a42-d90d225d2b86.png)

## Qu'est-ce que Dependabot ?

Dependabot est un outil de gestion de dépendances pour les projets de développement de logiciels qui s'intègre avec GitHub et GitLab. Il utilise des informations provenant des fichiers de configuration de dépendances pour identifier les mises à jour disponibles pour les packages utilisés dans le projet, et crée ensuite des pull requests pour les intégrer dans le code source. Cela permet aux développeurs de maintenir leurs dépendances à jour facilement et automatiquement, réduisant ainsi les risques de failles de sécurité ou de bogues liés aux dépendances obsolètes.

## Comment configurer Dependabot ?

Dependabot est un service tiers qui peut être intégré à GitHub. Avant de pouvoir l'utiliser, il faut autoriser l'accès à votre compte GitHub en fonction de l'endroit où se trouve votre projet. En se rendant dans les settings du projet, puis dans Code security and analysis, on observe une partie dédiée à dependabot.

![image](https://user-images.githubusercontent.com/78076783/229188409-d9ff4842-a963-4959-99d8-b00015387f92.png)
 
Il faut cliquer sur enable à côté de Dependabot alerts, Dependabot security updates et Dependabot version updates afin de pouvoir profiter de ses services sur le projet associé.

Lorsqu'on clique sur enable à côté de Dependabot version update, cela crée un fichier dependabot.yml avec un contenu par défaut.

![image](https://user-images.githubusercontent.com/78076783/229188738-b9bf944a-f4a7-418c-ac4b-96561dba5875.png)

Le fichier dependabot.yml est utilisé pour spécifier les dépendances du projet et pour indiquer à Dependabot les mises à jour à appliquer. Il contient des informations telles que les référentiels Git, les régles de mise à jour, la fréquence des analyses, etc.

Pour configurer Dependabot, il suffit de modifier le fichier dependabot.yml en fonction de ses besoins spécifiques. Par exemple, il est possible de spécifier des règles pour ignorer certaines mises à jour, ou pour appliquer des mises à jour de sécurité immédiatement.

Ce fichier YAML par défaut (photo au dessur) spécifie une configuration pour la mise à jour des dépendances du votre projet avec Dependabot. Voici ce que signifie chaque élément du fichier :

`version: 2`: spécifie la version de la syntaxe utilisée dans le fichier dependabot.yml. La version 2 est la version la plus récente et elle est recommandée.

`updates`: spécifie la liste des mises à jour de dépendances à appliquer. Dans cet exemple, il n'y a qu'un élément de mise à jour.

`package-ecosystem`: "": spécifie l'écosystème de packages à mettre à jour. L'écosystème est la plate-forme ou le langage de programmation pour lequel vous souhaitez mettre à jour les dépendances. Dans cet exemple, la valeur est vide, ce qui signifie que vous devez spécifier l'écosystème dans cette section. Pour un projet Java utilisant Maven, on peut spécifier maven entre les guillemets.

`directory`: "/": spécifie l'emplacement des manifestes de packages pour l'écosystème que vous mettez à jour. Dans cet exemple, les manifestes de packages sont situés à la racine du projet.

`schedule`: spécifie la fréquence à laquelle les mises à jour seront effectuées.

`interval`: "weekly": spécifie que les mises à jour de dépendances seront effectuées une fois par semaine. Vous pouvez personnaliser la fréquence des mises à jour en utilisant d'autres valeurs de l'interval, telles que "daily", "monthly", "fortnightly", etc.

Le fichier dependabot.yml est créé dans le dossier .github du référentiel GitHub, car c'est le dossier recommandé pour stocker les fichiers de configuration pour les fonctionnalités GitHub, y compris pour Dependabot.

Le dossier .github est spécial dans le sens où il est automatiquement créé lorsque l'on crée un nouveau référentiel sur GitHub. Cela signifie que si un fichier de configuration comme dependabot.yml est ajouté dans ce dossier, il sera immédiatement pris en compte par les fonctionnalités de GitHub.

De plus, en plaçant les fichiers de configuration dans le dossier .github, ils sont isolés des autres fichiers du votre projet. Cela rend plus facile de les trouver et de les modifier en cas de besoin, et cela empêche également les fichiers de configuration de se mélanger avec les autres fichiers du projet.

## Comment utiliser Dependabot ?

Une fois que la configuration de Dependabot est terminée sur le projet, il exécute le travail tout seul en analysant périodiquement (selon le paramètre choisi dans dependabot.yml, donc par exemple monthly veut dire vérifications mensuelles) les fichiers de dépendances du projet et en cherchant des mises à jour disponibles.

Lorsqu'une mise à jour est trouvée, Dependabot crée une pull request pour mettre à jour la dépendance concernée. Il est alors possible d'examiner la pull request pour vérifier que la mise à jour ne casse pas le code ou qu'elle n'affecte pas négativement d'autres dépendances du projet.

Si tout semble bon, la pull request peut être fusionnée pour appliquer la mise à jour de la dépendance.

En résumé, Dependabot exécute le travail tout seul en cherchant des mises à jour disponibles, en créant des pull requests pour les mises à jour, et en permettant d'examiner et de fusionner les mises à jour. La fréquence de vérification peut être personnalisée et il est possible d'ajuster les paramètres de configuration à tout moment pour répondre aux besoins du projet.

## Page d'accueil de Dependabot : 

* https://dependabot.com/ 

  
