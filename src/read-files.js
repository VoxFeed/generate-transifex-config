const fs = require('fs');
const path = require('path');

function readFiles(sourcePath) {
  const rootPath = String(require('app-root-path'));

  function execute() {
    const fullPaths = readFilesRecursively(sourcePath);
    const files = fullPaths.map(generateFileData);
    return sortByName(files);
  }

  function readFilesRecursively(dirPath) {
    return fs.readdirSync(dirPath).reduce((results, fileName) => {
      const currentPath = path.join(dirPath, fileName);
      const stat = fs.statSync(currentPath);

      if (stat.isFile()) results.push(currentPath);
      else if (stat.isDirectory()) results = results.concat(readFilesRecursively(`${currentPath}/`));

      return results;
    }, []);
  }

  function generateFileData(fullPath) {
    const projectPath = removeFilePath(rootPath, fullPath);
    const name = getFileName(fullPath);
    const extension = getFileExtension(fullPath);

    return {
      name,
      extension,
      fullPath,
      projectPath
    };
  }

  function removeFilePath(removePath, file) {
    return path.relative(removePath, file);
  }

  function getFileName(fullPath) {
    const fileLocation = removeFilePath(sourcePath, fullPath);
    return fileLocation.replace(/\W+/g, '-').toLowerCase();
  }

  function getFileExtension(file) {
    return `${file}`.split('.').slice(-1)[0];
  }

  function sortByName(array) {
    return array.sort((a, b) => a.name > b.name);
  }

  return execute();
}

module.exports = readFiles;
