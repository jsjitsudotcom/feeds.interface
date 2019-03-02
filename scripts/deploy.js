const argv = require("minimist")(process.argv.slice(2));
const { exec } = require("child_process");
const Promise = require("bluebird");
const chalk = require("chalk");
const inquirer = require("inquirer");

if (!argv.stage)
  throw new Error("You have to provide a --stage [ beta | dev | production ]");

const getUrl = stage => {
  if (stage === "production") return `www.jsjitsu.com`;
  throw new Error(
    `The stage "${stage}" is not a valid stage -> [ production ]`
  );
};

const execWithCache = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude '*' --include '*-worker.js' --include '*.html' --content-encoding=gzip --cache-control max-age=0`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

const execAll = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude 'index.html' --exclude '*-worker.js' --content-encoding=gzip`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

console.log(
  chalk.yellow(
    `
    This module deployment will deploy static contents with gzip content-encoding.
    All files who match with have to be gziped
    > *.css
    > *.js
    > *.html
    `
  )
);

const log = message => () => console.log(chalk.green(message));

const runWithConfirm = () =>
  inquirer
    .prompt({
      type: "confirm",
      name: "confirm",
      message: `Êtes-vous sûr de vouloir déployer l'application en ${
        argv.stage
      } ?`
    })
    .then(response => {
      if (response.confirm) return run(argv.stage);
      log("Déploiement aborté !")();
      return false;
    })
    .then(() => process.exit());

const runWithoutConfirm = () => run(argv.stage).then(() => process.exit());

const run = stage => {
  log(`Deployment started to ${stage}`)();
  return execAll(stage)()
    .then(log("Static content successfully deployed"))
    .then(execWithCache(stage))
    .then(log("Static with cache successfully deployed"));
};

if (process.env.CI) return runWithoutConfirm();
return runWithConfirm();
