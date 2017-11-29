const NEW_LINE = '\n';

function configBlocksToString(blocks) {
  return blocks.map(configBlockToString).join(NEW_LINE);
}

function configBlockToString(block) {
  const { title, content = [] } = block;
  const header = `[${title}]${NEW_LINE}`;

  return content.reduce((result, item) => {
    const { key, value } = item;
    const row = `${key} = ${value}`;
    return `${result}${row}${NEW_LINE}`;
  }, header);
}

module.exports = configBlocksToString;
