<p align="center">
    <img width="100" alt="repairbot.png" src="docs/repairbot.png"/>
</p>

<h1 align="center">Repairnator</h1>

---

## 🤨 What is Repairnator?

Repairnator is an open source tool for automatically repairing failing builds. It consists of 3 steps :
- Detect a failure, static warning in a build
- Look for a specific patch to fix the failure
- Apply the patch (if found) with a pull request

## 🧱 How to setup with a Github App

- Go on the following link : https://github.com/apps/repairnator-bot
![Repairnator Bot](docs/repairnator_1.png)
- Configure the app for the specific repository you want to use it on
- Repairnator requires Travis CI builds.
- Install Travis CI on the repository from this link : https://github.com/marketplace/travis-ci
- Run a Travic CI build with a ".travic.yml" file in your repository.
- If the build fails, Repairnator will automatically create a pull request to fix the build.