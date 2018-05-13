const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const chalk = require("chalk");
const rimraf = require("rimraf");

const { mkdir, touch, cp, write } = require("./helper");

const inputName = process.argv[2];
if (!inputName) {
  throw "Please type in algorithm name";
}

const id = parseInt(process.argv[3]);
if (!id) {
  throw "Please type in algorithm id";
}

const fileLoader = (basePath, fileName) => {
  const filePath = path.join(basePath, fileName);
  return ejs.fileLoader(filePath).toString("utf-8");
};

const findHyphens = array => {
  const indexes = [];
  array.forEach((ch, i) => {
    if (ch === "-") {
      indexes.push(i);
    }
  });
  return indexes;
};

const camelName = () => {
  const array = inputName.split("");
  findHyphens(array).forEach(i => {
    array[i + 1] = array[i + 1].toUpperCase();
  });
  return array.filter(ch => ch !== "-").join("");
};

const createTitle = () => {
  const array = inputName.split("");
  array[0] = array[0].toUpperCase();
  findHyphens(array).forEach(i => {
    array[i + 1] = array[i + 1].toUpperCase();
  });
  return array.map(ch => (ch === "-" ? " " : ch)).join("");
};

const UNDERSCORE_UPPERCASE_NAME = () =>
  inputName
    .split("")
    .map(ch => (ch === "-" ? "_" : ch.toUpperCase()))
    .join("");

const createReducerName = () => `${camelName()}Reducer`;

const srcPath = path.join(path.resolve(__dirname), "../");

const templateDir = path.join(srcPath, "tools", "dp-template");
const templateReduxDir = path.join(templateDir, "redux");

if (process.argv[4] === "force") {
  const toBeRemoved = path.join(srcPath, "algorithms", inputName);
  rimraf.sync(toBeRemoved, fs);
  console.log(chalk.bold.red(`removed directory: ${toBeRemoved}`));
}

const destDir = mkdir(path.join(srcPath, "algorithms"), inputName);
const reduxDir = mkdir(destDir, "redux");
const mockDir = mkdir(destDir, "__mock__");
const testsDir = mkdir(destDir, "__tests__");

const mockFileName = `${inputName}-mock.json`;
write(path.join(mockDir, mockFileName), "{}");
touch(testsDir, `${inputName}.spec.js`);

const renderHelperJs = () => {
  const ejsTemplate = fileLoader(templateDir, "helper.ejs");
  const render = ejs.render(ejsTemplate, {
    mockFileName: mockFileName,
    title: createTitle(),
    id: id
  });
  write(path.join(destDir, "helper.js"), render);
};

const cpIndexJs = () => {
  const source = path.join(templateDir, "index.js");
  const target = path.join(destDir, "index.js");
  cp(source, target);
};

const renderActionsJs = () => {
  const ejsTemplate = fileLoader(templateReduxDir, "actions.ejs");
  const render = ejs.render(ejsTemplate, {
    UNDERSCORE_UPPERCASE_NAME: UNDERSCORE_UPPERCASE_NAME()
  });
  write(path.join(reduxDir, "actions.js"), render);
};

const renderContainerJs = () => {
  const ejsTemplate = fileLoader(templateReduxDir, "container.ejs");
  const render = ejs.render(ejsTemplate, { reducerName: createReducerName() });
  write(path.join(reduxDir, "container.js"), render);
};

const renderSagaJs = () => {
  const cName = camelName();
  const name = cName.charAt(0).toUpperCase() + cName.substr(1);
  const ejsTemplate = fileLoader(templateReduxDir, "saga.ejs");
  const render = ejs.render(ejsTemplate, {
    name: name,
    id: id
  });
  write(path.join(reduxDir, "saga.js"), render);
};

const cpReducerJs = () => {
  const source = path.join(templateReduxDir, "reducer.js");
  const target = path.join(reduxDir, "reducer.js");
  cp(source, target);
};

const cpUpdateStepsJs = () => {
  const source = path.join(templateReduxDir, "update-steps.js");
  const target = path.join(reduxDir, "update-steps.js");
  cp(source, target);
};

const cpAlgorithmJs = () => {
  const source = path.join(templateDir, "algorithm.js");
  const target = path.join(destDir, "algorithm.js");
  cp(source, target);
};

const cpConstantsJs = () => {
  const source = path.join(templateDir, "constants.js");
  const target = path.join(destDir, "constants.js");
  cp(source, target);
};

const cpIntroductionJs = () => {
  const source = path.join(templateDir, "introduction.js");
  const target = path.join(destDir, "introduction.js");
  cp(source, target);
};

cpIndexJs();
renderHelperJs();
renderActionsJs();
renderContainerJs();
cpReducerJs();
cpUpdateStepsJs();
cpAlgorithmJs();
cpConstantsJs();
cpIntroductionJs();
renderSagaJs();
