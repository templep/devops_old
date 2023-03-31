<p align="center">
    <img width="100" alt="repairbot.png" src="docs/repairnator/repairbot.png"/>
</p>

<h1 align="center">Repairnator</h1>

---

## 🤨 What is Repairnator?

Repairnator is an open source tool for automatically repairing failing builds. It consists of 3 steps :
- Detect a failure, static warning in a build
- Look for a specific patch to fix the failure
- Apply the patch (if found) with a pull request

![Workflow](docs/repairnator/workflow.jpg)

More detailed on the following paper : [Repairnator patches programs automatically](https://ubiquity.acm.org/article.cfm?id=3349589)

## 🧱 How to setup with a Github App

- First create a java maven project repository on Github 
- Go on the following link : https://github.com/apps/repairnator-bot
![Repairnator Bot](docs/repairnator/repairnator_1.png)
- Configure the app for the specific repository you want to use it on
- Repairnator requires Travis CI builds.
- Install Travis CI on the repository from this link : https://github.com/marketplace/travis-ci

![Travis CI Install](docs/repairnator/travis_install.png)

- Create a .travis.yml file in the repo, see documentation on how to configure Travis : [Travis Tutorial](https://docs.travis-ci.com/user/tutorial/)
- For this tutorial, you can write in your .travis.yml file :

```yml
language: java
notifications:
  email:
    on_failure: never
    on_success: never
```

- Commit and push the .travis.yml file

## 📝 Usage

- Create a pull request with a failing build for your repository.
- On the [Travis panel](https://app.travis-ci.com/) you should see something like this :

![Travis CI Install](docs/repairnator/travis_build_failed.png)

- If a patch is found by Repairnator, a pull request will be created with the proposed patch (from docs : approx 1/1000 builds).

## 📦 Other possible setup
Repairnator can be used differently than using a Github App :
> **Command Line :**
> 
> You can use Repairnator as a command line tool, see the [documentation](https://github.com/eclipse/repairnator/blob/master/doc/README.md)
> 
> You can use it by running a maven command that specify the build you want to check. It is also possible to use a docker image directly instead of running a maven command.

> **Travis Scanner :**
> 
> You can use Repairnator as a Travis Scanner, see the [documentation](https://github.com/eclipse/repairnator/blob/master/doc/README.md)
> 
> It will continuously scan your Travis builds and create pull requests if a patch is found.

> **Flacoco Scanner :**
> 
> You can use Repairnator as a Flacoco Scanner, see the [documentation](https://github.com/eclipse/repairnator/blob/master/doc/README.md)
> 
> Similar to Travis Scanner, it will instead continuously scan for pull requests and check for failing build and create pull requests if a patch is found.

> **Jenkins plugin :**
> 
> You can use Repairnator as a Jenkins plugin, see the [documentation](https://github.com/eclipse/repairnator/blob/master/doc/repairnator-jenkins-plugin.md)
> 
> It will continuously scan your Jenkins builds and create pull requests if a patch is found for a failing build.