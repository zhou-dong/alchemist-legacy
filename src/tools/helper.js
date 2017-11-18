const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const green = chalk.green;
const magenta = chalk.magenta;
const yellow = chalk.yellow;
const red = chalk.bold.red;
const log = console.log;

module.exports.mkdir = (basePath, dirName) => {
  const dirPath = path.join(basePath, dirName);
  if (fs.existsSync(dirPath)) {
    throw `${dirPath} already exist`;
    process.exit();
  }
  fs.mkdirSync(dirPath);
  successLog("created directory", basePath, dirName);
  return dirPath;
};

module.exports.touch = (basePath, fileName) => {
  const filepath = path.join(basePath, fileName);
  fs.closeSync(fs.openSync(filepath, "w"));
  successLog("created file", basePath, fileName);
  return filepath;
};

module.exports.cp = (source, target) => {
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
  log(green("copied file from "), yellow(source), green("to"), magenta(target));
};

module.exports.write = (filepath, content) => {
  fs.writeFile(filepath, content, err => {
    if (err) {
      throw "error writing file: " + err;
    } else {
      log(green("write file"), magenta(filepath), yellow("finished"));
    }
  });
};

const successLog = (prefix, basePath, name) => {
  log(green(prefix), yellow(name), "at path", magenta(basePath));
};
