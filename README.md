<h1 align="center">Deriv App</h1>

This repository contains the various platforms of the Deriv application.

![CircleCI](https://img.shields.io/circleci/build/github/binary-com/deriv-app) ![Prerequisite](https://img.shields.io/badge/node-%3E%3D16.16.0-blue.svg) ![Prerequisite](https://img.shields.io/badge/npm-%3E%3D7.21.0-blue.svg) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (short format)](https://img.shields.io/sonar/violations/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io)
[![codecov](https://codecov.io/gh/binary-com/deriv-app/branch/dev/graph/badge.svg?token=LClg2rlZ4z)](https://codecov.io/gh/binary-com/deriv-app)

**In this document**:

-   [Other Documents](#other-documents)
-   [Pre-installation](#Pre-installation)
-   [Quick start](#Quick-start)
-   [Packages](#packages)
-   [Working With This Repo](#working-with-this-repo)
    -   [Package names](#package-names)
    -   [Usage](#usage)
        -   [Starting a Development Server](#starting-a-dev-server)
        -   [How to Clean Packages](#how-to-clean-packages)
        -   [Examples of Script Usage](#examples-of-script-usage)
        -   [Release](#release)
-   [PR Guidelines](#pr-guidelines)
-   [FAQ](#faq)

## Other documents:

-   [General](docs/README.md) - Contains general philosophy and overview of this package
-   [Stylesheet guidelines](docs/Stylesheet/README.md) - Contains rules for CSS/SASS code style
-   [JavaScript guidelines](docs/JavaScript/README.md) - Contains rules for JS/JSX code style
-   [Modules docs](docs/Modules/README.md) - Contains implementation guides (i.e., scaffolding, code usage)
-   [e2e and performance testing docs](e2e_tests/README.md) - Contains documents for create and running e2e and performance tests
-   [Manage dependencies](docs/Dependencies/README.md)

[comment]: <> (TODO: Refactor Clean Project to be under usage)

## Pre-installation

Before running or contribute to this project, you need to have the setup of the following package in your environment.

-   node >=16.16.0
-   npm >=7.21.0
-   git (for `contribution`)

**Note**: `node -v` and `sudo node -v` should be the same version.

## Quick start

1.  **Fork the project**

    In order to work on your own version of the Deriv application, please fork the project to your own repository.

2.  **Clone using SSH**

    ```sh
    git clone git@github.com:binary-com/deriv-app.git
    ```

3.  **Enter project directory**

    ```sh
    cd deriv-app
    ```

4.  **Install your dependencies:**

    ```sh
    npm run bootstrap
    ```

**Note**: If you get the error `peer dependencies`, follow the instruction below:

1. Discard any changes related `package-lock.json` (if applicable)
2. Make sure that the Node version is the same as recommended version otherwise upgrade or downgrade it
3. Run the following commands:

    ```sh
    $ npm ci
    $ lerna link
    $ lerna bootstrap --ci --hoist --strict
    $ lerna link
    $ npm run build
    $ npm run bootstrap
    ```

    > **Note:** Internal behavior of bootstrap has changed to hoist "common" packages to root `node_modules` instead of individual packages.
    > This behavior benefits us from having issues with multiple instances of the same library across dependencies, but it throws errors if the package versions are out of date. This was a trade-off we decided to So when you are adding a dependency which already exists in other packages, their version should be matched.
    > In case of wanting a new version for a dependency, please update all packages.

    [comment]: <> (3. If you wish to install and work with only a single, or multiple but specific packages, then follow `3i` for each package. However, if you wish to install and work with all packages, follow `3ii`.)
    [comment]: <> (i. Run `npm run bootstrap {package name}`. Replace `{package name}` with the name of the package you want to work with. eg.: `trader`, `bot`)
    [comment]: <> (ii. Install all packages with a hoisting strategy \(lift all common packages to a root `node_modules` and not package specific\), run `npm run hoist`)

4. **Set custom domain:**

    If you have a custom domain that you use for GH Pages, add a file named `CNAME` in `packages/core/scripts/` to be used for your GH Pages deployments

5. **Build the project:**

    ```sh
    npm run build
    ```

<br />

## Packages

| Package name   | Docs                                                                                                                | Version                                                                                                                      |
| :------------- | :------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `Account`      | -                                                                                                                   | -                                                                                                                            |
| `Appstore`     | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/appstore/README.md)     | -                                                                                                                            |
| `Bot-skeleton` | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/bot-skeleton/README.md) | -                                                                                                                            |
| `Bot-web-ui`   | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/bot-web-ui/README.md)   | -                                                                                                                            |
| `Cashier`      | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/cashier/README.md)      | -                                                                                                                            |
| `Cfd`          | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/cfd/README.md)          | -                                                                                                                            |
| `Components`   | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/components/README.md)   | -                                                                                                                            |
| `Core`         | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/core/README.md)         | -                                                                                                                            |
| `Indicators`   | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/indicators/README.md)   | -                                                                                                                            |
| `P2P`          | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/p2p/README.md)          | [![npm](https://img.shields.io/npm/v/@deriv/p2p.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@deriv/p2p) |
| `Publisher`    | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/publisher/README.md)    | -                                                                                                                            |
| `Shared`       | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/shared/README.md)       | -                                                                                                                            |
| `Trader`       | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/trader/README.md)       | -                                                                                                                            |
| `Translations` | [![](https://img.shields.io/badge/API%20Docs-readme-orange.svg?style=flat-square)](packages/translations/README.md) | -                                                                                                                            |

<br />

## Working With This Repo

All packages must contain the following scripts to perform the stated actions:

| Package param | Command            | Description                                                                                                                                                            |
| :-----------: | ------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      ✅       | `start`            | Runs complete test and build suite and starts the dev server.                                                                                                          |
|      ✅       | `serve`            | Runs build suite and starts the dev server. When serving `core`, takes optional `open` value as argument to open specific page. (e.g: `npm run serve core --open=bot`) |
|      ✅       | `build`            | Runs build suite and outputs the result into `dist`. Takes optional `base` value as argument.                                                                          |
|      ✅       | `test`             | Runs the test suite with eslint, stylelint and jest.                                                                                                                   |
|      ✅       | `test:jest`        | Runs only the jest test suite.                                                                                                                                         |
|      ✅       | `test:qa`          | Runs the e2e test suite.                                                                                                                                               |
|      ✅       | `test:performance` | Runs the performance test suite.                                                                                                                                       |

[comment]: <> (The following scripts are not to be used except for CI/CD environments)
[comment]: <> (| ❌ | `deploy` | Runs `build` script, then pushes the output to GH Pages. |)
[comment]: <> (| ❌ | `deploy:clean` | Runs `build` script, clears `gh-pages` branch, then pushes the output to GH Pages. |)
[comment]: <> (| ❌ | `deploy:folder` | Runs `build` script, then pushes the output to the specified folder in GH Pages. |)

**Note: Please follow the README of each package you intend to work with on how to get set up and their custom scripts.** However, the above scripts can be run from the root directory in the following manner.

<br />

## Package names

Each package is named with the `@deriv/` prefix, however for the scripts above, you do not need to add the `@deriv/` prefix as the scripts already prefix the 1st argument of the script with `@deriv/`. **However**, if you do use the `lerna` CLI directly, then you will need to use the full package name including the `@deriv/` prefix.

You can find the names of packages by first navigating to the `packages` folder. Each sub-folder is a package and contains a `package.json` file. The value of the `name` key in `package.json` is the package name.

### Usage

### Configuring Hosts file

In order to run our solution for the first time, you need to configure your `hosts` file:

1. Open terminal.
2. Open `hosts` file in your preferred text editor, f.e `sudo vim /etc/hosts`.
3. Add a new entry pointing to `127.0.0.1 localhost.binary.sx`.
4. Save the file and proceed to the next step.

### Starting a Development Server

If you wish to work on Core, simply run `npm run serve core`.

But for working on any of the other packages (such as Trader, Bot, P2P), perform the following:

1. Open 2 terminals.
2. Run `npm run serve {package name}` in the first one. e.g.: `npm run serve translations`, `npm run serve bot`, etc.
3. Then run `npm run serve core` in the second one.

<br />

### How to Clean Packages

If you intend to remove `node_modules` folder(s) from the projects, please run `npm run clean` from the root of the project.

This runs `lerna clean && rm -rf $(git rev-parse --show-toplevel)/node_modules` under the hood.
You can read more on the various lerna commands (and the [`clean` command](https://github.com/lerna/lerna/tree/master/commands/clean#readme)) over at the [Lerna docs](https://github.com/lerna/lerna/).

**Note**: In case of facing permission denied error, please simply run `sudo chown -R $(whoami) .` from the root of the project.

### How to clear cache

`npm cache clean -f`

<br />

### Examples of Script Usage

If a script supports the "Package param", you can supply a `{package name}` for it to run the script in. At the moment, only 1 package name can be given to a script, if you wish to run in multiple, please use the `lerna` command that's used under the hood as per its docs.

✅ In order to run the `start` script for the `bot` package, simply run:

```bash
npm run start bot
```

✅ Likewise for `trader` (or any other package) with a different script:

```bash
npm run test:stylelint trader
```

[comment]: <> (❌ Below command will not work as the script `deploy:clean` does not support "Package param" \(refer to the table in [Working With This Repo]\(#working-with-this-repo\)\): `bash npm run deploy:clean bot`)

<br />

## Release

There are 2 types of release:

1. Release to staging:
    1. `git tag staging_v20191205 -m 'release staging'` # the tag needs to follow the RegExp format `/^staging.*/`
    2. `git push origin staging_v20191205`
2. Release to production:
    1. `git tag production_v20191205 -m 'release production'`
    2. `git push origin production_v20191205`

There is a 4th type of release: releasing npm registry packages (currently `@deriv/p2p`). This a WIP, but the current method is:

1. Acquire membership to `@deriv` npm organization namespace.
2. Ensure you have a new (bumped) version of publishable packages (currently `@deriv/p2p`).
3. Run `npm run publish:p2p`. The command publishes all bumped packages. However, right now the name includes the word `p2p` to signal the WIP status and that P2P is the only published package under this repo.

<br />

## PR Guidelines

1. Use the `developer 1|developer 2/task_name` format for PR titles. (e.g.: `dev1|dev2/fixed_emoji_issue`, `dev1/added_superfast_jellyfish`)
    - Optional square bracket tag (e.g. `[WIP]`) can be at the end.
2. Use the appropriate package labels available on the repo to indicate which packages your PR modifies.
3. Use Draft PRs if you don't mean to request for reviews yet. [Read more here.](https://github.blog/2019-02-14-introducing-draft-pull-requests/)

<br />

## Test link deployment

There are two types of test link deployment preview:

1. Automatic deployment

Upon creating PR, [Vercel](https://vercel.com/) will auto-generate a test link inside the PR. you can use that to preview the test link for the changes you have made.

2. Manual deployment

If preferable to use manual deployment, you can use [gh-pages](https://pages.github.com/) functionality to create a test link. here are ways to do it:

-   You can simply deploy to root of the `gh-pages` branch with: `npm run deploy`.
-   You can clean (remove `br_` folders and clear root\) your `gh-pages` branch and deploy to root in a single command with `npm run deploy:clean`
-   You can deploy to a folder in your `gh-pages` branch in order to separate from root app deployment and other folder deployments with: `npm run deploy:folder br_test_folder` (folder name must be prefixed with `br_`))

<br />

## FAQ

1. How do I **install** an npm package in one of our packages?

    **A.** You can simply `cd` into the package you wish to install to, then run `npm i package-name` as usual. Or simply run a `lerna exec` like `lerna exec --scope=local-package -- npm i npm-package-name`, e.g.: `lerna exec --scope=@deriv/translations -- npm i i18next`. _Please note that for direct `lerna` CLI use, you need the full package name including the `@deriv/` prefix._

2. How do I **uninstall** an npm package from one of our packages?

    **A.** Just as installing, except the `npm` command you'd run would be `npm uninstall` (shortened to `npm un`). e.g.: `lerna exec --scope=@deriv/translations -- npm un i18next`.

3. How do I run `npm ci` or equivalent (to add dependencies based on `package-lock.json`?

    **A.** You have two options:

    1. use `lerna exec` with the `--scope` argument as the package you want to run the command on, as such `lerna exec --scope=trader -- npm ci`.
    2. `cd` into `packages/PACKAGE-NAME` and run `npm ci`, as such `cd packages/trader && npm ci`

4. Why do I need to run commands with `sudo`?

    **A.** You shouldn't need to. The only command that needs privilege is `serve` and `start` and that's because it's on port 443 **however, that script prompts you by itself, you do not need to place `sudo`**.

    If you face this issue, simply run `sudo chown -R $(whoami) .` from the root of the project.

5. My build(s) fail and I can see it related to Node Sass (`node-sass`), what do I do?

    **A.** This issue happens when your `node-sass` has its `binding.node` set to a version of node different from the current projects' one. Please try the following in order:

    1. First run `npx lerna exec -- npm rebuild node-sass` and try building your packages again.
    2. If that doesn't work, try `npm cache clean --force`, followed by `npm run clean`, and then `npm run bootstrap`.
    3. And finally, if that doesn't work then you can read deeper into this [StackOverflow post](https://stackoverflow.com/questions/37986800).

6. How can I regenerate `package-lock.json` file?

    We have added `bootstrap:dev` to scripts. If you are updating or adding a package and you want to regenerate `package-lock.json` file, you should run this command
    `npm run bootstrap:dev`
