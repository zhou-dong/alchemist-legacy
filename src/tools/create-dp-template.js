const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const green = chalk.green;
const magenta = chalk.magenta;
const yellow = chalk.yellow;
const red = chalk.bold.red;
const blue = chalk.blueBright;

const log = console.log;

const name = process.argv[2];
if (!name) {
  red("Please type in algorithm name");
  process.exit();
}

const createDir = (basePath, dirName) => {
  log(magenta("making directory"), yellow(dirName), "at path", basePath);
  const dirPath = path.join(basePath, dirName);
  if (fs.existsSync(dirPath)) {
    log(
      red("errors......"),
      yellow(dirName),
      red("already exist in"),
      basePath
    );
    process.exit();
  }
  fs.mkdirSync(dirPath);
  log(green("created directory"), yellow(dirName), "at path", basePath);
  return dirPath;
};

const createFile = (basePath, fileName) => {
  log(blue("creating file"), yellow(fileName), "at path", basePath);
  const filepath = path.join(basePath, fileName);
  fs.closeSync(fs.openSync(filepath, "w"));
  log(green("created file"), yellow(fileName), "at path", basePath);
  return filepath;
};

const workingDirectory = path.join(
  path.resolve(__dirname),
  "../",
  "algorithms"
);

log(blue("WorkingDirectory"), yellow(workingDirectory));

const baseDir = createDir(workingDirectory, name);
createFile(baseDir, "algorithm.js");
createFile(baseDir, "constants.js");
createFile(baseDir, "helper.js");
createFile(baseDir, "index.js");

const reduxDir = createDir(baseDir, "redux");
createFile(reduxDir, "actions.js");
createFile(reduxDir, "container.js");
createFile(reduxDir, "reducer.js");
createFile(reduxDir, "update-steps.js");

const mockDir = createDir(baseDir, "__mock__");
createFile(mockDir, `${name}-mock.json`);

const test = createDir(baseDir, "__test__");

log(green("Create Template Finished :)"));
