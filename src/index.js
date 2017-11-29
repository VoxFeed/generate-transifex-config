const readFiles = require('./read-files');
const getFilesConfig = require('./get-files-config');
const buildMainConfigBlock = require('./utils/build-main-config-block');
const buildFilesConfigBlocks = require('./utils/build-files-config-blocks');
const configBlocksToString = require('./utils/config-blocks-to-string');
const storeFile = require('./utils/store-file');

function generateTransifexConfig(params) {
  const { sourcePath, destinationPath, main, projectName } = params;
  const files = readFiles(sourcePath);
  const filesConfig = getFilesConfig(files, params);
  const configBlocks = [
    buildMainConfigBlock(main),
    ...buildFilesConfigBlocks(projectName, filesConfig)
  ];
  const content = configBlocksToString(configBlocks);
  storeFile(destinationPath, content);
}

module.exports = generateTransifexConfig;
