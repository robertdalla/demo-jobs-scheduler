## Strategik - Jobs Scheduler demo app (modified)

### Development Environment

To work on this project you will need installed on your local development machine Node.js (10.18.1 or greater), npm (6.x.x or greater) and grunt-cli (1.x.x or greater).

> Step1: clone the repo in your local dev workspace

```sh
git clone https://github.com/robertdalla/demo-jobs-scheduler.git
```

> Step2: make sure to use npm version 6.x.x or greater

Check version with:
```sh
npm -v
```

If npm needs to be updated, follow this [turorial](https://docs.npmjs.com/troubleshooting/try-the-latest-stable-version-of-npm)

> Step3: install globally grunt-cli

```sh
npm install -g grunt-cli
```

> Step4: install or update the dev environment

Go to the repo root folder.

Fix the too long path limitation (apply as global settings):
```sh
git config --system core.longpaths true
```

Remove any global old version of angular-cli:

```sh
npm uninstall -g @angular/cli
```

Then install a version of angular-cli globally that is compatible with the version of angular
```sh
npm cache verify  or npm cache clean --force
npm install -g @angular/cli@9.0.4
```

Then delete the file package-lock.json and node_modules folder.

IMPORTANT: in package.json make sure to use a version of @angular/compiler-cli that is same with @angular, and verify that the installed version of angular-cli is still compatible with this version of @angular

Now update your local project's package:
```sh
npm cache verify  or npm cache clean --force
npm install
```

Add the new generated package-lock.json file in the repo.

> Step5: build the app to run on localhost (for testing)

```sh
ng serve
```

> Step6: build the app for production

```sh
ng build
```

> Step7: deploy the app in your production hosting server

Upload the entire dist folder in your production webserver folder.
The starting point is index.html

