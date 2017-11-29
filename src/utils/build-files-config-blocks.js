const objectToBlockConfig = require('./object-to-block-config');

function buildFilesConfigBlocks(projectName, filesConfig) {
  return filesConfig.map(f => buildFileConfigBlock(projectName, f));
}

function buildFileConfigBlock(projectName, fileConfig) {
  const { name, options } = fileConfig;
  const title = `${projectName}.${name}`;

  return {
    title,
    content: objectToBlockConfig(options)
  }
}

module.exports = buildFilesConfigBlocks;
