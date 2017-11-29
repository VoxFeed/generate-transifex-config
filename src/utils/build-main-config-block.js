const objectToBlockConfig = require('./object-to-block-config');

function buildMainConfigBlock(params) {
  return {
    title: 'main',
    content: objectToBlockConfig(params)
  };
}

module.exports = buildMainConfigBlock;
