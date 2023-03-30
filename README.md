# Mise en place du monitoring perso

Sur cette branche, le monitoring s'effectue par l'envoie dans la console d'informations liées au temps que mettent les appels au back-end pour s'effectuer.

L'idée est de pouvoir mesurer le temps de réponse du back-end pour chaques requêtes effetuées. Une amélioration possible serait d'intégrer ce message dans l'interface graphique du monitoring. Avec suffisemment de données, on pourrait envisager de faire des moyennes ou tracer des graphiques. Cependant, notre projet initial sur lequel nous nous sommes basé n'envoie pas beaucoup de requêtes, nous n'avons donc pas assez de données pour en faire réellement quelque chose.

# Mise en place

Il faut lancer le docker compose dans le dossier "dockerCompose_production", puis se connecter à l'aide d'un navigateur à "http://localhost/".
Cette branche se concentrant sur l'affichage d'informations dans la console, il faut ouvrir la console (F12). Lorsque un appel au back-end se fait dans le projet, une ligne de la forme :

```
"TIME pour PREFIXE XX ms.
```

s'affiche dans la console. XX est le temps mis pour le back end à renvoyer l'information demandée, et PREFIXE est le nom de l'oppération (PUT, DELETE, etc.).