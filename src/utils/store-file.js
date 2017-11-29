const fs = require('fs');

function storeFile(destination, content) {
  return fs.writeFileSync(destination, content);
}

module.exports = storeFile;
