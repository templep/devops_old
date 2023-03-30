# Tutoriel de DevOps

# **Thème: Intégration continue, Analyse statique et Automatisation des tests**

## **Description**
Ce tutoriel entre dans le cadre des travaux pratiques du cours de DevOps vu en ESIR 2 (SI).

Dans ce dernier, nous réaliserons au sein d'un projet au choix, toute la démarche d'intégration continue, d'analyse statique et d'automatisation des tests.
Nous avons pour ce faire à notre disposition toute une flopée d'outils (chacun entrant dans une catégorie spécifique) que nous essayerons d'adopter dans la mise en oeuvre de la CI, de l'analyse statique de code ainsi que de l'automatisation des tests

# Sommaire

- [1 - Présentation du projet](#1---présentation-du-projet)

- [2 - Intégration Continue](#2---intégration-continue)

- [3 - Analyse statique](#3---analyse-statique)

- [3 - Présentation et mise en place des outils](#3---présentation-et-mise-en-place-des-outils)

- [4 - Observations et commentaires](#4---observations-et-commentaires)

- [5 - Guide de lancement](#5---guide-de-lancement)

- [6 - Démo](#6---demo)

# 1 - Présentation du projet

Pour ce tutoriel, nous utiliserons un projet réalisé dans le cadre du cours d'Architecture Logiciel.
Ce dernier est composé d'un ensemble de microservices interagissants ensemble.
L'on dispose donc:

- D'un backend chargé de toutes les opérations CRUD (Create, Retreive, Update, Delete) sur les membres des associations. Ce dernier est developpé en **NestJs**;

- Une base de données PostgreSQL pour le stockage (une image docker dans notre cas); 

- D'un frontend naturellement pour l'aspect visuel du site web réalisé en **Angular**;

- Un MOM Rabbitmq pour la création d'un queue destinée à être utilisée pour l'envoie des mails;

- Un microservice Quarkus qui implémente le consumer pour la queue Rabbitmq. Ce microservice est chargé de la logique pour l'envoie des mails;

L'ensemble de ses microservice sont déployés au sein de containers docker.



# 2 - Intégration Continue


L'intégration continue est une pratique de développement logiciel dans laquelle les membres d'une équipe intègrent leur travail fréquemment, en général chaque personne intègre au moins une fois par jour ce qui conduit à plusieurs intégrations par jour. Chaque intégration est vérifiée par une construction automatisée (y compris des tests) afin de détecter les erreurs d'intégration le plus rapidement possible. De nombreuses équipes estiment que cette approche permet de réduire considérablement les problèmes d'intégration et de développer plus rapidement des logiciels cohérents.

Une fois qu’on sait ce qu’est l'intégration continue de façon globale,  faire en sorte que tout cela fonctionne sans accroc, c'est évidemment un peu plus complexe que cela. Nous allons dans la suite nous  concentrer sur les pratiques clés qui font d'une intégration continue une totale réussite.

 ## **- Maintenir un référentiel unique pour le projet**
 
Celà peut paraitre anodin mais les projets logiciels impliquent de nombreux fichiers qui doivent être orchestrés ensemble pour construire un produit. Garder la trace de tous ces fichiers représente un effort considérable, en particulier lorsque plusieurs personnes sont impliquées. Il n'est donc pas surprenant qu'au fil des ans, les équipes de développement de logiciels aient créé des outils pour gérer tout cela. Ces outils, appelés outils de gestion du code source, font partie intégrante de la plupart des projets de développement. Il suffit donc de s'assurer que l'on dispose d'un système de gestion du code source décent. Le coût n'est pas un problème car il existe des outils open-source de bonne qualité. Le référentiel open source de prédilection étant Github, c'est celui que nous utiliserons dans ce TP.

 ## **- Automatiser la phase du build**

Transformer du code source en un système opérationnel peut souvent être un processus compliqué impliquant la compilation, le déplacement de fichiers, le chargement de schémas dans les bases de données, etc. Cependant, comme la plupart des tâches de cette partie du développement logiciel, ce processus peut être automatisé et devrait l'être. Demander à des personnes de taper des commandes étranges ou de cliquer sur des boîtes de dialogue est une perte de temps et un terrain propice aux erreurs.On doit donc s'assurer de pouvoir construire et lancer notre système à l'aide de ces scripts en utilisant une seule commande.
 
 ## **- Rendre notre build auto testable**
  
Traditionnellement, une compilation signifie compiler, lier et tout ce qui est nécessaire pour qu'un programme s'exécute. Un programme peut s'exécuter, mais cela ne signifie pas qu'il fait ce qu'il faut. Les langages modernes à typage statique permettent de détecter de nombreux bogues, mais beaucoup d'autres passent à travers les mailles du filet.

Un bon moyen de détecter les bogues plus rapidement et plus efficacement est d'inclure des tests automatisés dans le processus de construction.Ce que nous ferons un peu plus bas.

  
## **- Tout le monde commit sur le main chaque jours**

Comme vu en cours le devops c'est plus que des outils, "c'est une philosophie" et également un ensemble de bonnes pratiques parmi lesquelles figure la communication au sein de l'équipe.  L'intégration est avant tout une question de communication. L'intégration permet aux développeurs d'informer les autres développeurs des modifications qu'ils ont apportées. Une communication fréquente permet aux gens d'être informés rapidement de l'évolution des changements.

La seule condition préalable pour qu'un développeur s'engage sur le main est qu'il puisse construire correctement son code. Cela implique, bien sûr, de réussir les tests de compilation. Comme pour tout cycle de validation, le développeur met d'abord à jour sa copie de travail (sa branche), pour qu'elle corresponde à la branche main, résout les éventuels conflits avec la ligne principale, puis construit sur sa machine locale. Si la compilation est réussie, il est alors libre de valider la version principale.
En procédant fréquemment de la sorte, les développeurs découvrent rapidement s'il existe un conflit entre deux développeurs.

    
## **- Chaque 'Commit' doit enclencher un Build sur la machine d'intégration**

En utilisant des livraisons quotidiennes, une équipe obtient fréquemment des versions testées. Cela devrait signifier que la branche main reste saine. Dans la pratique, cependant, il y a toujours des problèmes. L'une des raisons est que souvent les developpeurs speuvent oublier d'effectuer les mises à jour et les compilations avant de valider. Les différences d'environnement entre les machines des développeurs en sont une autre.

Par conséquent, on doit pouvoir s'assurer que les constructions régulières sont effectuées sur une machine d'intégration et que la livraison n'est considérée comme effectuée que si cette construction d'intégration réussit. Étant donné que le développeur qui effectue la validation est responsable de cette opération, il doit surveiller la version principale afin de pouvoir la corriger en cas de défaillance. 

Il y a deux façons principales de s'assurer de cela : en utilisant **une construction manuelle** ou **un serveur d'intégration continue**.

L'approche manuelle est la plus simple à décrire. Il s'agit essentiellement d'un processus similaire à la construction locale qu'un développeur effectue avant la livraison dans le référentiel. Le développeur se rend à la machine d'intégration, vérifie la tête de la ligne principale (qui contient maintenant sa dernière livraison) et lance la construction d'intégration. Il garde un œil sur sa progression, et si la compilation réussit, il en a terminé avec sa livraison.

Un serveur d'intégration continue agit comme un moniteur du référentiel. Chaque fois qu'un commit contre le référentiel se termine, le serveur extrait automatiquement les sources sur la machine d'intégration, lance une compilation et notifie le résultat de la compilation à l'auteur du commit. L'auteur de la validation n'a pas terminé tant qu'il n'a pas reçu la notification généralement un courriel.
    
## **- Corriger immédiatement les erreurs de Build**

Un élément clé de la construction continue est que si la construction principale échoue, elle doit être corrigée immédiatement. L'intérêt de travailler avec l'intégration continue est que vous développez toujours sur une base stable connue. Ce n'est pas une mauvaise chose que la version principale tombe en panne, bien que si cela se produit tout le temps, cela suggère que les gens ne sont pas assez attentifs à la mise à jour et à la construction locale avant la validation. Cependant, lorsque la version principale est défaillante, il est important qu'elle soit corrigée rapidement.

## **- Rendre rapide l'étape du Build**

L'objectif de l'intégration continue est de fournir un retour d'information rapide. Rien n'est plus dommageable pour une activité d'intégration continue qu'une compilation qui prend beaucoup de temps.  La plupart des developpeurs considèrent qu'un Build qui prend une heure est totalement déraisonnable. Cependant, certaines équipes rêvraient de pouvoir le faire aussi rapidement et il nous arrive encore de rencontrer des cas où il est très difficile d'atteindre cette vitesse.

Pour la plupart des projets, cependant, la ligne directrice XP d'une construction en dix minutes est parfaitement raisonnable. La plupart de nos projets modernes y parviennent. Cela vaut la peine de concentrer les efforts pour y parvenir, car chaque minute de réduction du temps de construction est une minute gagnée pour chaque développeur à chaque fois qu'il effectue une validation. 

Si vous êtes confronté à un temps de construction d'une heure, passer à une construction plus rapide peut sembler une perspective décourageante. Il peut même être décourageant de travailler sur un nouveau projet et de penser à la façon de garder les choses rapides. Pour les applications d'entreprise, en tout cas, nous avons constaté que le goulot d'étranglement habituel est le test - en particulier les tests qui impliquent des services externes tels qu'une base de données.
    
## **- Tester dans un Clone de l'environnement de production**

L'objectif des tests est d'éliminer, dans des conditions contrôlées, tout problème que le système rencontrera en production. L'environnement dans lequel le système de production fonctionnera joue un rôle important à cet égard. Si vous testez dans un environnement différent, chaque différence entraîne un risque que ce qui se passe pendant les tests ne se produise pas en production.

C'est pourquoi on doit configurer notre environnement de test de manière à ce qu'il imite le plus fidèlement possible notre environnement de production. on utilise par exemple le même logiciel de base de données, avec les mêmes versions, la même version du système d'exploitation. On met aussi toutes les bibliothèques appropriées qui se trouvent dans l'environnement de production dans l'environnement de test, même si le système ne les utilise pas réellement. Utilisez les mêmes adresses IP et les mêmes ports, utilisez le même matériel.
    
## **- Permettre à tout le monde d'obtenir facilement le dernier executable**

L'une des parties les plus difficiles du développement de logiciels est de s'assurer que l'on construit le bon logiciel. Nous avons constaté qu'il est très difficile de spécifier à l'avance ce que l'on veut et d'être correct ; les gens trouvent beaucoup plus facile de voir quelque chose qui n'est pas tout à fait correct et de dire comment il faut le changer. Les processus de développement agile s'attendent explicitement à cette partie du comportement humain et en tirent parti.

Pour que cela fonctionne, toute personne impliquée dans un projet logiciel devrait pouvoir obtenir le dernier exécutable et être en mesure de l'exécuter : pour des démonstrations, des tests exploratoires ou simplement pour voir ce qui a changé cette semaine.
    
## **- Tous les développeur doivent être en mesure de voir ce qui se passe**

L'intégration continue est une question de communication. Il faut donc s'assurer que tout le monde peut facilement voir l'état du système et les changements qui y ont été apportés.

L'une des choses les plus importantes à communiquer est l'état de la construction de la ligne principale.De nombreuses équipes aiment rendre cela encore plus évident en connectant un affichage continu au système de construction - les lumières qui s'allument en vert lorsque la construction fonctionne, ou en rouge si elle échoue, sont populaires. Les lampes de lave rouges et vertes sont particulièrement courantes. Elles indiquent non seulement l'état de la compilation, mais aussi depuis combien de temps elle se trouve dans cet état. Des bulles sur une lampe rouge indiquent que la construction est en panne depuis trop longtemps.

## **- Automatiser le déploiement**

Pour faire de l'intégration continue, on a besoin de plusieurs environnements, un pour exécuter les tests de validation, un ou plusieurs pour exécuter les tests secondaires. Puisqu'on déplace des exécutables entre ces environnements plusieurs fois par jour,on souhaiterais le faire automatiquement. Il est donc important d'avoir des scripts qui nous permettront de déployer facilement l'application dans n'importe quel environnement.

Une conséquence naturelle de cela est qu'on devra également avoir des scripts qui nous permettent de déployer en production avec la même facilité.Il s'agit également d'une option peu coûteuse puisqu'elle utilise les mêmes capacités que celles utilisées pour le déploiement dans les environnements de test.


# 3 - Présentation et mise en place des outils

Dans cette section, l'on décrirera de façon précises les outils choisis. L'on expliquera également toute la démarche et la mise en place de ces derniers. L'on parlera également

## **Bazel**

- [x] **Présentation:** Bazel est un système de construction (build system) open source développé par Google. Il est conçu pour permettre la construction d'applications de manière efficace, rapide et reproductible, en particulier pour des projets de grande envergure avec de nombreuses dépendances et configurations. Bazel utilise une approche basée sur des *règles* pour définir comment construire des projets. Les règles Bazel décrivent comment les différentes parties d'un projet sont compilées, liées, testées et déployées. Les règles sont écrites en utilisant une syntaxe de type fonction, qui permet aux développeurs de décrire de manière précise comment les dépendances doivent être résolues, comment le code doit être compilé et comment les artefacts doivent être créés.

- [x] **Raisons du choix:** L'un des principaux avantages de Bazel est sa capacité à effectuer des builds incrémentiels, où seules les parties du projet qui ont été modifiées depuis le dernier build sont reconstruites. Cela peut réduire considérablement *les temps de build*, en particulier pour des projets de grande envergure.Bazel prend en charge plusieurs langages de programmation, y compris C++, Java, Python, et de nombreux autres. Il est également compatible avec plusieurs plateformes, y compris Linux, macOS et Windows. Dans notre cas nous sommes dans un environement linux et les langages concernés par notre application sont: TypeScript pour notre backend nestjs et notre frontend angular et Java pour notre microservice quarkus. Notre MOM RabbitMQ et notre database ne nous interesserons pas dans cette section étant donné le choix que nous avons fait de les exécuter autravers d'image docker vu qu'ils ne nécessite pas de configuration suppélementaire de notre part.

- [x] **Mise en oeuvre:** Bazel construit des logiciels à partir d'un code source organisé dans une arborescence de répertoires appelée espace de travail. Les fichiers sources de l'espace de travail sont organisés dans une hiérarchie imbriquée de paquets, où chaque paquet est un répertoire qui contient un ensemble de fichiers sources apparentés et un fichier BUILD. Le fichier BUILD spécifie les sorties logicielles qui peuvent être construites à partir du code source.
Un espace de travail est une arborescence de répertoires sur votre système de fichiers qui contient les fichiers sources du logiciel que vous souhaitez construire. Chaque espace de travail possède un fichier texte nommé WORKSPACE qui peut être vide ou contenir des références à des dépendances externes nécessaires à la construction des résultats.
Dans notre situation, 

!! Les répertoires contenant un fichier appelé WORKSPACE sont considérés comme la racine d'un espace de travail. Par conséquent, Bazel ignore toute arborescence de répertoires dans un espace de travail dont la racine est un sous-répertoire contenant un fichier WORKSPACE, car ils forment un autre espace de travail.


Reporting a Vulnerability

To report a security issue, please email security@bazel.build with a description of the issue, the steps you took to create the issue, affected versions, and, if known, mitigations for the issue. Our vulnerability management team will respond within 3 working days of your email. If the issue is confirmed as a vulnerability, we will open a Security Advisory. This project follows a 90 day disclosure timeline.
Bazel on Buildkite 101

When you first log into Buildkite you are presented with a list of pipelines. A pipeline is a template of steps that are executed either in sequence or in parallel and that all need to succeed in order for the pipeline to succeed. The Bazel organisation has dozens of pipelines. Here are a selected few:

pipelines

    The bazel postsubmit pipeline builds and tests each commit to Bazel's repository on all supported platforms.
    The bazel presubmit pipeline is triggered on every pull request to Bazel.
    The rules_go postsubmit pipeline is triggered on every commit to the rules_go repository.
    The TensorFlow pipeline builds and tests TensorFlow at HEAD every four hours.

Builds

When you click on a pipeline you can see the last few builds of this pipeline. Clicking on a build then gives you access to the details of the build. For example, the below image shows a failed build step on Ubuntu 16.04.

failed build step

One can see which tests failed by clicking on the Test section. In the below example, the //src/test/shell/bazel:external_path_test was flaky as it failed in 1 out of 5 runs.

flaky test

You can view the failed test attempt's test.log file in the Artifacts tab.

flaky test log
Useful Links

buildkite useful buttons

buildkite testlog buttons
Pull Requests

Bazel accepts contributions via pull requests. Contributions by members of the bazelbuild organisation as well as members of individual repositories (i.e. rule maintainers) are whitelisted automatically and will immediately be built and tested on Buildkite.

An external contribution, however, first needs to be verified by a project member and therefore will display a pending status named Verify Pull Request.

status verify pull request

A member can verify a pull request by clicking on Details, followed by Verify Pull Request.

buildkite verify pull request

Please vet external contributions carefully as they can execute arbitrary code on our CI machines
Build and Test Results

After a pull request has been built and tested, the results will be displayed as a status message on the pull request. A detailed view is available when clicking on the corresponding Details link. Click here for an example.

pull request details
Presubmit for downstream projects

You can preview the effect of an unmerged commit on downstream projects. See Testing Local Changes With All Downstream Projects.
Checking incompatible changes status for downstream projects

Bazelisk + Incompatible flags pipeline runs bazelisk --migrate on all downstream projects and reports a summary of all incompatible flags and migrations statuses of downstream projects.

This pipeline works in the following ways:

    The pipeline tests downstream projects with Bazel@last_green by default. But you can override the Bazel version by setting the USE_BAZEL_VERSION environment variable (e.g. USE_BAZEL_VERSION=5.3.0).
    The pipeline fetches the list of incompatible flags to be tested by parsing open Bazel Github issues with incompatible-change and migration-ready labels. You can override the list of incompatible flags by setting the INCOMPATIBLE_FLAGS environment variable (e.g. INCOMPATIBLE_FLAGS=--foo,--bar).

This pipeline shows the following information:

    The list of projects that already fail without any incompatible flags. Those projects are already broken due to other reasons, they need to be fixed in the Bazel@HEAD + Downstream pipeline first. already failing projects
    The list of flags that don't break any passing downstream projects or don't break any projects that're owned/co-owned by the Bazel team. passing flags
    The list of projects that are broken by a specific flag. projects need migration per flag
    The list of projects that needs migration for at least one flag. projects need migration
    Click a specific job to check the log and find out which flags are breaking it. flags need migration per job

Culprit Finder

Bazel downstream projects is red? Use culprit finder to find out which bazel commit broke it!

First you should check if the project is green with the latest Bazel release. If not, probably it's their commits that broke the CI.

If a project is green with release Bazel but red with Bazel nightly, it means some Bazel commit broke it, then culprit finder can help!

Create "New Build" in the Culprit Finder project with the following environment variable:

    PROJECT_NAME (The project name must exist in DOWNSTREAM_PROJECTS in bazelci.py)
    (Optional) TASK_NAME (The task name must exist in the project's config file, eg. macos_latest). For old config syntax where platform name is essentially the task name, you can also set PLATFORM_NAME instead of TASK_NAME. If not set, culprit finder will bisect for all tasks of the specified project.
    (Optional) TASK_NAME_LIST A list of TASK_NAME separated by ,. You can set this to bisect for multiple tasks in one build. It will be ignored if TASK_NAME is set.
    (Optional) GOOD_BAZEL_COMMIT (A full Bazel commit, Bazel built at this commit still works for this project). If not set, culprit finder will use the last green bazel commit in downstream pipeline as the good bazel commit.
    (Optional) BAD_BAZEL_COMMIT (A full Bazel commit, Bazel built at this commit fails with this project). If not set, culprit finder will use the lastest Bazel commit as the bad bazel commit.
    (Optional) NEEDS_CLEAN (Set NEEDS_CLEAN to true to run bazel clean --expunge before each build, this will help reduce flakiness)
    (Optional) REPEAT_TIMES (Set REPEAT_TIMES to run the build multiple times to detect flaky build failure, if at least one build fails we consider the commit as bad)

eg.

PROJECT_NAME=rules_go
PLATFORM_NAME=ubuntu2004
GOOD_BAZEL_COMMIT=b6ea3b6caa7f379778e74da33d1bd0ff6477f963
BAD_BAZEL_COMMIT=91eb3d207714af0ab1e5812252a0f10f40d6e4a8

Note: Bazel commit can only be set to commits after 63453bdbc6b05bd201375ee9e25b35010ae88aab, Culprit Finder needs to download Bazel at specific commit, but we didn't prebuild Bazel binaries before this commit.
Bazel Auto Sheriff

Bazel Auto Sheriff is the pipeline to monitor Bazel CI build status and identify reasons for breakages.

Based on a project's build result in main build (with Bazel@Release) and downstream build (with Bazel@HEAD), the Bazel Auto Sheriff does analyzing by the following principles:

    Main Build: PASSED, Downstream build: PASSED

    Everything is fine.

    Main Build: FAILED, Downstream build: PASSED

    Retry the failed jobs to check if they are flaky
        If passed, report the failed tasks as flaky.
        If failed, the project is probably broken by its own change.

    Main Build: PASSED, Downstream build: FAILED

    Retry the failed downstream jobs to check if they are flaky
        If passed, report the failed tasks as flaky.
        If failed, use culprit finder to do a bisect for each failed project to detect the culprit.

    Main Build: FAILED, Downstream build: FAILED

    Rebuild the project at last green commit
        If failed, the build is likely broken by an infrastructure change.
        If passed, analyze main build and downstream build separately according to the same principles as above.

After the analysis, the pipeline will give a summary of four kinds of breakages:

    Breakages caused by infra change.
    Breakages caused by Bazel change, including the culprits identified.
    Breakages caused by the project itself.
    Flaky builds.

You can check the analysis log for more details.
Configuring a Pipeline

Each pipeline is configured via a Yaml file. This file either lives in $PROJECT_DIR/.bazelci/presubmit.yml (for presubmits) or in an arbitrary location whose path or URL is passed to the CI script (as configured in the Buildkite settings of the respective pipeline). Projects should store the postsubmit configuration in their own repository, but we keep some configurations for downstream projects in https://github.com/bazelbuild/continuous-integration/tree/master/buildkite/pipelines.
Basic Syntax

The most important piece of the configuration file is the tasks dictionary. Each task has a unique key, a platform and usually some build and/or test targets:

---
tasks:
  ubuntu_build_only:
    platform: ubuntu2004
    build_targets:
    - "..."
  windows:
    platform: windows
    build_targets:
    - "..."
    test_targets:
    - "..."

If there is exactly one task per platform, you can omit the platform field and use its value as task ID instead. The following code snippet is equivalent to the previous one:

---
tasks:
  ubuntu2004:
    build_targets:
    - "..."
  windows:
    build_targets:
    - "..."
    test_targets:
    - "..."

Setting Environment Variables

You can set environment variables for each individual task via the environment field:

---
tasks:
  ubuntu1804:
    environment:
      CC: clang
    build_targets:
    - "..."

Running Commands, Shell Scripts or Binary Targets

The presubmit configuration allows you to specify a list of shell commands that are executed at the beginning of every job. Simply add the batch_commands (Windows) or shell_commands field (all other platforms).

You can even run executable targets via the run_targets field. The following example demonstrates all of these features:

---
tasks:
  ubuntu1804:
    shell_commands:
    - rm -f obsolete_file
    run_targets:
    - "//whatever"
    build_targets:
    - "..."
  windows:
    batch_commands:
    - powershell -Command "..."
    build_targets:
    - "..."

Running Bazel coverage

The coverage_targets field allows you to specify a list of targets that will be run using bazel coverage:

---
tasks:
  ubuntu2004:
    coverage_targets:
    - "..."

Using Specific Build & Test Flags

The build_flags and test_flags fields contain lists of flags that should be used when building or testing (respectively):

---
tasks:
  ubuntu1804:
    build_flags:
    - "--define=ij_product=clion-latest"
    build_targets:
    - "..."
    test_flags:
    - "--define=ij_product=clion-latest"
    test_targets:
    - ":clwb_tests"

Specifying a Display Name

Each task may have an optional display name that can include Emojis. This feature is especially useful if you have several tasks that run on the same platform, but use different Bazel binaries. Simply set the name field:

---
tasks:
  windows:
    name: "some :emoji:"
    build_targets:
    - "..."

Generating semantic information with Kythe

You can use kythe_ubuntu2004 platform along with some index_* fields to create a task that generate semantic information of your code with Kythe.

The index_targets field contains list of targets that should be indexed.

The index_targets_query field contains a query string that is used to generate additional index targets by command bazel query ${index_targets_query}. The returned targets will be merged into index_targets.

The index_flags field contains list of build flags that should be used when indexing.

The index_upload_policy field is used to set policy for uploading generated files. Available values are:

    Always: Always upload generated files even build failed.
    IfBuildSuccess: Default value. Only upload generated files if build succeed and raise error when build failed.
    Never: Never upload index files and raise error when build failed.

If index_upload_gcs is True, the generated files will be uploaded to Google Cloud Storage.

---
tasks:
  kythe_ubuntu2004:
    index_targets:
    - "..."
    index_targets_query: "kind(\"java_(binary|import|library|plugin|test|proto_library) rule\", ...)"
    index_flags:
    - "--define=kythe_corpus=github.com/bazelbuild/bazel"
    index_upload_policy: "IfBuildSuccess"
    index_upload_gcs: True

Legacy Format

Most existing configuration use the legacy format with a "platforms" dictionary:

---
platforms:
  ubuntu1804:
    build_targets:
    - "..."
    test_targets:
    - "..."

The new format expects a "tasks" dictionary instead:

---
tasks:
  arbitrary_id:
    platform: ubuntu1804
    build_targets:
    - "..."
    test_targets:
    - "..."

In this case we can omit the platform field since there is a 1:1 mapping between tasks and platforms. Consequently, the format looks almost identical to the old one:

---
tasks:
  ubuntu1804:
    build_targets:
    - "..."
    test_targets:
    - "..."

The CI script still supports the legacy format, too.
Using a specific version of Bazel

The CI uses Bazelisk to support older versions of Bazel, too. You can specify a Bazel version for each pipeline (or even for individual platforms) in the pipeline Yaml configuration:

---
bazel: 0.20.0
tasks:
  windows:
    build_targets:
    - "..."
  macos:
    build_targets:
    - "..."
  ubuntu1804:
    bazel: 0.18.0
    build_targets:
    - "..."
[...]

In this example the jobs on Windows and MacOS would use 0.20.0, whereas the job on Ubuntu would run 0.18.0.

CI supports several magic version values such as latest, last_green and last_downstream_green. Please see the Bazelisk documentation for more details.
Testing with incompatible flags

Similar to the aforementioned downstream pipeline you can configure individual pipelines to run with bazelisk --migrate. As a result, the pipeline runs your targets with all incompatible flags that will be flipped in the next major Bazel release and prints detailed information about which flags need to be migrated.

You can enable this feature by adding the following code to the top of the pipeline steps in Buildkite at https://buildkite.com/bazel/YOUR_PIPELINE_SLUG/settings, not in the pipeline configuration yaml file:

---
env:
  USE_BAZELISK_MIGRATE: true

If you want your pipeline to fail if at least one flag needs migration, you need to add this code instead:

---
env:
  USE_BAZELISK_MIGRATE: FAIL

If you want to enable this feature for a single build, but not for the entire pipeline, you can follow these steps instead:

    Navigate to your pipeline in Buildkite.
    Click on the "New Build" button in the top right corner.
    Expand the pipeline options via a click on "Options".
    Enter USE_BAZELISK_MIGRATE=FAIL into the "Environment Variables" text field.
    Click on "Create Build".

macOS: Using a specific version of Xcode

We upgrade the CI machines to the latest version of Xcode shortly after it is released and this version will then be used as the default Xcode version. If required, you can specify a fixed Xcode version to test against in your pipeline config.

Warning: We might have to run jobs that specify an explicit Xcode version on separate, slower machines, so we really advise you to not use this feature unless necessary.

The general policy is to not specify a fixed Xcode version number, so that we can update the default version more easily and don't have to update every single CI configuration file out there.

However, if you know that you need to test against multiple versions of Xcode or that newer versions frequently break you, you can use this feature.

tasks:
  # Test against the latest released Xcode version.
  macos:
    build_targets:
    - "..."
  # Ensure that we're still supporting Xcode 10.1.
  macos_xcode_10_1:
    platform: macos
    xcode_version: "10.1"
    build_targets:
    - "..."

Take care to quote the version number, otherwise YAML will interpret it as a floating point number.
Running Buildifier on CI

For each pipeline you can enable Buildifier to check all WORKSPACE, BUILD, BUILD.bazel and .bzl files for lint warnings and formatting violations. Simply add the following code to the top of the particular pipeline configuration:

---
buildifier: latest
[...]

As a consequence, every future build for this pipeline will contain an additional "Buildifier" step that runs the latest version of Buildifier both in "lint" and "check" mode. Alternatively you can specify a particular Buildifier version such as "0.20.0".

There is also a more advanced syntax that allows you to specify which warnings should be checked in lint mode:

---
buildifier:
  version: latest
  warnings: "positional-args,duplicated-name"
[...]

Using multiple Workspaces in a single Pipeline

Some projects may contain one or more WORKSPACE files in subdirectories, in addition to their top-level WORKSPACE file. All of these workspaces can be tested in a single pipeline by using the working_directory task property. Consider the configuration for a project that contains a second WORKSPACE file in the examples_dir/ directory:

---
tasks:
  production_code:
    name: "My Project"
    platform: ubuntu1804
    test_targets:
    - //...
  examples:
    name: Examples
    platform: ubuntu1804
    working_directory: examples_dir
    test_targets:
    - //...

Validating changes to pipeline configuration files

You can set the top-level validate_config option to ensure that changes to pipeline configuration files in the .bazelci directory will be validated. With this option, every build for a commit that touches a configuration file will contain an additional validation step for each modified configuration file.

Example usage:

---
validate_config: 1
tasks:
  macos:
    build_targets:
    - "..."

Exporting JSON profiles of builds and tests

Bazel's JSON Profile is a useful tool to investigate the performance of Bazel. You can configure your pipeline to export these JSON profiles on builds and tests using the include_json_profile option.

Example usage:

---
tasks:
  ubuntu2004:
    include_json_profile:
    - build
    - test
    build_targets:
    - "..."
    test_targets:
    - "..."

When include_json_profile is specified with build, the builds will be carried out with the extra JSON profile flags. Similarly for test. Other values will be ignored.

The exported JSON profiles are available as artifacts after each run.
Matrix Testing

Similar to Github Actions's matrix testing support, you can specify a matrix to create multiple tasks by performing variable substitution in a single task configuration.

Example usage:

---
matrix:
  bazel_version: ["4.2.2", "5.0.0"]
  unix_platform: ["centos7", "debian10", "macos", "ubuntu2004"]
  python: ["python2", "python3"]
  unix_compiler: ["gcc", "clang"]
  win_compiler: ["msvc", "clang"]

tasks:
  unix_test:
    name: "Test my project on Unix systems"
    platform: ${{ unix_platform }}
    compiler: ${{ unix_compiler }}
    python: ${{ python }}
    build_targets:
    - "//..."
    test_targets:
    - "//..."
  windows_test:
    name: "Test my project on Windows"
    platform: "windows"
    bazel: ${{ bazel_version }}
    compiler: ${{ win_compiler }}
    python: ${{ python }}
    build_targets:
    - "//..."
    test_targets:
    - "//..."

The unix_test task configuration will generate 16 tasks (4 * 2 * 2) for each unix_platform, unix_compiler, and python combination.

The windows_test task configuration will generate 8 tasks (2 * 2 * 2) for each bazel_version, win_compiler and python combination.
FAQ
My tests fail on Bazel CI due to "Error downloading"

Q: I added or changed an external repository and now my test is failing on Bazel CI only with errors like this:

WARNING: Download from https://github.com/bazelbuild/java_tools/releases/download/javac11-v11.0/java_tools_javac11_linux-v11.0.zip failed: class java.net.ConnectException Operation not permitted (connect failed)
ERROR: An error occurred during the fetch of repository 'remote_java_tools_linux_beta':
   java.io.IOException: Error downloading [https://github.com/bazelbuild/java_tools/releases/download/javac11-v11.0/java_tools_javac11_linux-v11.0.zip] to /private/var/tmp/_bazel_buildkite/c3a616e1648c5e14a8ab09d0d59696c2/sandbox/darwin-sandbox/3279/execroot/io_bazel/_tmp/58d272c7f3dd803b2bcb2fc7be47d391/root/fb8b458bcc92813a6fcf57a0dbe6e8bd/external/remote_java_tools_linux_beta/java_tools_javac11_linux-v11.0.zip: Operation not permitted (connect failed)

A: We run most tests on CI without network access and instead inject the external repositories from the outside. This saves a lot of network traffic and I/O (because the Bazel integration tests don't have to extract the repository archives again and again).

In the code review of this PR, philwo@ explained how to fix test failures like this: bazelbuild/bazel#11436.



## **Jenkins**
- [x] **Présentation:** Jenkins est un outil open-source d'intégration continue et de déploiement continu (CI/CD) qui permet de construire, tester et déployer des logiciels de manière automatisée. Il est principalement utilisé pour automatiser les tâches répétitives du processus de développement logiciel, telles que la compilation de code source, l'exécution de tests, la construction d'images Docker, le déploiement sur différents environnements, etc.

- [x] **Raisons du choix:** Jenkins offre une grande flexibilité et peut être facilement intégré avec d'autres outils de développement logiciel tels que Git, GitHub, SVN, Jira, etc. Il dispose également d'une large communauté de développeurs et de contributeurs, ce qui lui permet de disposer d'un grand nombre de plugins pour étendre ses fonctionnalités et s'adapter à différents besoins.

En somme, Jenkins est un outil essentiel pour les équipes de développement logiciel qui souhaitent automatiser leur processus de déploiement et de test, afin de pouvoir fournir des logiciels de haute qualité plus rapidement et plus efficacement. Ce qui est notre cas.

![Capture d’écran du 2023-03-29 01-03-10](https://user-images.githubusercontent.com/107374001/228599503-d5db387a-62f5-42a4-87f7-179182efd727.png)




## **SonarCloud**
- [x] **Présentation:** C'est un service cloud d'analyse de code proposé par la société SonarSource. Il permet aux développeurs et aux équipes de développement de détecter et de corriger les vulnérabilités, les bugs, les erreurs et les problèmes de qualité de code dans leurs applications. SonarCloud utilise une variété de techniques d'analyse statique pour évaluer la qualité du code, y compris l'analyse de la complexité cyclomatique, la détection de code dupliqué, la couverture de code, la conformité aux normes de codage et la détection de vulnérabilités de sécurité connues.

- [x] Raisons du choix: En intégrant SonarCloud dans notre processus de développement, on améliore la qualité de notre code, réduit les bugs et les vulnérabilités et on améliore la sécurité globale de notre application.SonarCloud propose des intégrations avec de nombreux outils de développement populaires tels que GitHub, GitLab et Azure DevOps ce qui constitue d'ailleurs l'une des raisons majeurs de son adoption.

- [x] Mise en oeuvre: Pour l'intégrer à notre projet rien de plus simple:
  - Se rendre sur le site officiel de SonarCloud: https://sonarcloud.io;
  - Se connecter via notre compte de versionnage de code en l'occurence *github* dans notre cas;
  - Selectionner le "repository" concerné;

![Capture d’écran du 2023-03-28 01-44-37](https://user-images.githubusercontent.com/107374001/228092766-8dae148f-325f-4886-b956-f1a097b056c9.png)

                                               Apperçu du dashboard avant 
                                               
![Capture d’écran du 2023-03-28 01-45-37](https://user-images.githubusercontent.com/107374001/228093202-0120c4a0-9763-4a5e-8838-7824dd26f270.png)
                                               
                                               Apperçu du dashboard après prise en compte  


On remarque aisement dans l'ensemble que Sonarcloud est un outil puissant qui a permis d'améliorer la qualité du code et de s'assurer que notre base de code est maintenable, évolutive et sécurisée.


## **Skymutator**

## **CI/CD pipeline avec Github actions**


# 4 - Observations et commentaires


# 5 - Guide de lancement


# 6 - Démo





