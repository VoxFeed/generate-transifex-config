const path = require('path');
const readFiles = require(`${ROOT_PATH}/src/read-files`);

const FIXTURES_PATH = path.join(__dirname, '../fixtures/sources/es');

const EXPECTED_RESPONSE = [{
  name: 'file1-json',
  extension: 'json',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/es/file1.json',
  projectPath: 'test/fixtures/sources/es/file1.json'
}, { 
  name: 'file2-json',
  extension: 'json',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/es/file2.json',
  projectPath: 'test/fixtures/sources/es/file2.json'
}, { 
  name: 'file3-txt',
  extension: 'txt',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/es/file3.txt',
  projectPath: 'test/fixtures/sources/es/file3.txt'
}, { 
  name: 'sub-dir1-file4-md',
  extension: 'md',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/es/sub-dir1/file4.md',
  projectPath: 'test/fixtures/sources/es/sub-dir1/file4.md'
}, { 
  name: 'sub-dir1-sub-dir2-file5-js',
  extension: 'js',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/es/sub-dir1/sub-dir2/file5.js',
  projectPath: 'test/fixtures/sources/es/sub-dir1/sub-dir2/file5.js'
}].sort((a, b) => a.name > b.name);

describe('readFiles', () => {
  it('should return an array of objects with data for each file', () => {
    const actualResponse = readFiles(FIXTURES_PATH);
    expect(actualResponse).to.be.deep.equal(EXPECTED_RESPONSE);
  });
});
