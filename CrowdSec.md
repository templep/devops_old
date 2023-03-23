- [CrowdSec](#crowdsec)
  - [Introduction à l’outil CrowdSec](#introduction-à-loutil-crowdsec)
  - [Fil d’Arianne](#fil-darianne)
    - [Problématique](#problématique)
  - [Mise en place de la solution](#mise-en-place-de-la-solution)
    - [Informations](#informations)
    - [Créer son compte](#créer-son-compte)
    - [Installation](#installation)
    - [Tableau de bord](#tableau-de-bord)
    - [Scenarios](#scenarios)
    - [Alertes](#alertes)
    - [Bouncers](#bouncers)
    - [Les commandes](#les-commandes)
  - [Références](#références)

# CrowdSec

## Introduction à l’outil CrowdSec

>“Make the internet a safer place for everyone” - CrowdSec

CrowdSec est un outil de monitoring de sécurité gratuit et opensource.

Il a été développé grâce à la collaboration d’anciens consultants d’horizons différents (Sysadmins, DevOps et SecOps) ce qui est l’essence même de la philosophie DevOps.

Le but de cet IPS (Intrusion Prevention System) est de proposer une sécurité personnalisée et relativement simple d’accès. Elle pourra notamment :

- détecter des cyber attaques puis de prendre des décisions,
- automatiser ces tâches,
- fournir un centre de contrôle cyber,
- rendre sécurité accessible à tous,
- créer une communauté active contre le HackOps (automatisation des procédés de hacking).

[CrowdSec - The open-source & collaborative IPS](https://www.crowdsec.net/)



## Fil d’Arianne

Le DevOps est certe une philosophie mais aussi un chantier sur lequel se trouve de multiples outils interagissant entre eux. Malheureusement, ces outils peuvent être la cause de failles de sécurité (CVE) et des protections réseaux ne sont pas mis en place.

### Problématique

Comment ajouter une sécurité à notre système DevOps pour être notifiée en cas de failles ou de comportement malicieux et même prendre des décisions de façon automatisé ?


## Mise en place de la solution

### Informations

Voici les différents systèmes sur lequel CrowdSec est déployable : 

- Linux (Debian, Ubuntu, EL/Centos7, EL/Centos Stream 8, Amzn Linux 2, OpenWRT, CloudLinux),
- FreeBSD,
- OPNsense,Version Docker
- Helm/K8s,
- Windows

Vous retrouverez un tutoriel pour chacun des systèmes de la liste ci-dessus sur le site de CrowdSec ([Installation CrowdSec](https://docs.crowdsec.net/docs/getting_started/install_crowdsec/)).

Il existe également une solution Docker disponible ici . Néanmoins cette solution est assez pesteuse, aussi nous nous concentrerons sur une installation classique : [Docker CrowdSec](/Docker_CrowdSec.md)


### Créer son compte

En allant sur le site de [CrowdSec](https://doc.crowdsec.net/) vous trouverez en haut un onglet “Console” accessible [ici](https://app.crowdsec.net/signup).

Vous devrez vous créer un compte sur le site. Une fois toutes les conditions remplies, vous tomberez sur la console :

![login.png](/assets/login.png)

Il sera cessaire de choisir une des catégories puis de renseigner le nombre de collaborateurs qui utilisera le logiciel.

### Installation

Une fois connecté à la console, un tutoriel vous attend afin d’installer CrowdSec sur votre serveur :

```bash
curl  -s https://packagecloud.io/install/repositories/crowdsec/crowdsec/script.deb.sh | sudo bash
sudo apt-get  install crowdsec
sudo apt  install crowdsec-firewall-bouncer-iptables
sudo cscli  console enroll [key]
```

La dernière commande vous permet d’établir la connexion entre votre serveur et la console.

![enroll.png](/assets/enroll.png)

### Tableau de bord

Vous voilà sur ce centre de contrôle, nous allons voir à quoi correspondent chaque item.

![serveur.png](/assets/enroll.png)

- **Scenarios** : un scénario est un ensemble de règles qui décrivent un comportement potentiellement nuisible (exemple : tentatives de connexion infructueuses, DDOS, scans de port),
- **Agent** : un programme qui permet de surveiller les activités du serveur en fonction des scénarios introduit,
- **Alertes** : lorsqu’un agent détecte une activité suspecte via scénario, une alerte est générée,
- **Bouncer** : logiciels autonomes chargés de prendre une décision suite à une alerte : bloquer une IP, présenter un captcha, appliquer le MFA à un utilisateur donné, etc…
- **Blocklist** : établir une blacklist pour bloquer l’accès à certain IP (certaines listes sont déjà construites et prête à être utilisées).

### Scenarios

Initialement 35 scénarios sont déjà déployés, nous allons en voir quelques uns.

**Quelques exemples :** 

- **[fortinet-cve-2018-13379](https://hub.crowdsec.net/author/crowdsecurity/configurations/fortinet-cve-2018-13379) et [grafana-cve-2021-43798](https://hub.crowdsec.net/author/crowdsecurity/configurations/grafana-cve-2021-43798) :** Ce type de scénario a pour but de bloquer les attaques profitant d’une faille répertoriée CVE (Common Vulnerability and Exploit).

- **[http-xss-probing](https://hub.crowdsec.net/author/crowdsecurity/configurations/http-xss-probing) :** vise à détecter, avec très peu de chances de faux positifs, les tentatives de détection XSS (les failles XSS ou Cross-Site Scripting est une injection dans l’URL).

- **[ssh-slow-bf](https://hub.crowdsec.net/author/crowdsecurity/configurations/ssh-slow-bf)** : Détecte les authentifications ssh lentes par bruteforce.


**Comment en ajouter ? :**

Il est possible d’ajouter des scénarios déjà existant via une base de données ([ici](https://hub.crowdsec.net/browse/)) ou bien créer ses propres scénarios afin de répondre aux besoins spécifiques que l’on aurait. Pour cela, CrowdSec a créé un [tutoriel](https://www.notion.so/CrowdSec-12173c34db2e416db7216ba3b8759751).

D’autre part il est possible de partager ses scénarios avec le reste des utilisateurs, c’est la force de CrowdSec.

### Alertes

En cliquant sur le module d’alerte, nous obtenons une liste des traces malveillantes que le/les agent(s) ont détectés en fonction des scénarios.

![alert_monitor.png](/assets/alert_monitor.png)

Ci-dessus est présenté la fenêtre de Visualisation permettant de voir quelques informations tel que  :

- les IPs qui ont tenté de communiquer avec votre serveur,
- les sources AS (Autonomous System) d'où provient le trafic ou l'attaque,
- les agents qui ont détecté une présence,
- les scénarios qui ont été activés.

Un peu plus bas, nous retrouvons une liste complète de chaque potentielle attaque dans laquelle nous retrouvons chacune des informations vues ci-dessus.

![alert_list.png](/assets/alert_list.png)

### Bouncers

Il est également possible d’ajouter des bouncers, d’ailleur un [tutoriel](https://blog.raspot.in/fr/blog/crowdsec-ajout-et-configuration-dun-bouncer) à été écrit a ce propos.

Installation d’un Bouncer :

1. **Obtenir le nom du bouncer**
Chercher un bouncer : [https://hub.crowdsec.net/browse/#bouncers](https://hub.crowdsec.net/browse/#bouncers)
Nous utiliserons le : **cs-nginx-bouncer**
2. **Ajouter le bouncer au serveur**
`cscli bouncers add cs-nginx-bouncer`
3. (Pour certains Bouncers) Association de la clé API
Toujours sur le serveur se rendre sur : `cd /etc/crowdsec/bouncers/`
Ecrire la clé API : `nano cs-nginx-bouncer.yml`

Votre Bouncer est installé !

### Les commandes

Vous pouvez utilisé la commande `cscli` sur le serveur où a été instalé CrowdSec, voici une liste des paramètres utilisable :

```bash
alerts         Manage alerts
bouncers       Manage bouncers [requires local API]
capi           Manage interaction with Central API (CAPI)
collections    Manage collections from hub
completion     Generate completion script
config         Allows to view current config
console        Manage interaction with Crowdsec console (https://app.crowdsec.net)
dashboard      Manage your metabase dashboard container [requires local API]
decisions      Manage decisions
explain        Explain log pipeline
help           Help about any command
hub            Manage Hub
hubtest        Run functional tests on hub configurations
lapi           Manage interaction with Local API (LAPI)
machines       Manage local API machines [requires local API]
metrics        Display crowdsec prometheus metrics.
notifications  Helper for notification plugin configuration
parsers        Install/Remove/Upgrade/Inspect parser(s) from hub
postoverflows  Install/Remove/Upgrade/Inspect postoverflow(s) from hub
scenarios      Install/Remove/Upgrade/Inspect scenario(s) from hub
simulation     Manage simulation status of scenarios
support        Provide commands to help during support
version        Display version and exit.
```

---

## Références

| Nom | Source |
| :---: | :---: |
| 2 min pour se protéger des HACKERS - Waked XY | https://www.youtube.com/watch?v=dvqgc8f_2Nw |
| Tracker l'IP des attaquants - Waked XY | https://www.youtube.com/watch?v=j5QnrSJXVrQ |
| Comment protéger son serveur Linux des attaques avec CrowdSec ? | https://www.it-connect.fr/comment-proteger-son-serveur-linux-des-attaques-avec-crowdsec/ |
| [Tuto] Installation et Configuration de CrowdSec avec le reverse proxy SWAG | https://www.forum-nas.fr/threads/tuto-installation-et-configuration-de-crowdsec-avec-le-reverse-proxy-swag.18327/ |
| Crowdsec : Ajout et configuration d'un bouncer | https://blog.raspot.in/fr/blog/crowdsec-ajout-et-configuration-dun-bouncer |
| CrowdSec Hub | https://hub.crowdsec.net/ |