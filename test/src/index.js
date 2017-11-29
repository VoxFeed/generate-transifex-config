const path = require('path');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const FIXTURES_PATH = path.join(__dirname, '../fixtures/sources/es');
const DESTINATION_PATH = path.join(__dirname, './config');

const EXPECTED_RESPONSE = `[main]
host = https://www.transifex.com

[project-name.file1-json]
source_lang = es
source_file = test/fixtures/sources/es/file1.json
file_filter = test/fixtures/sources/<lang>/file1.json
type = KEYVALUEJSON

[project-name.file2-json]
source_lang = es
source_file = test/fixtures/sources/es/file2.json
file_filter = test/fixtures/sources/<lang>/file2.json
type = KEYVALUEJSON

[project-name.file3-txt]
source_lang = es
source_file = test/fixtures/sources/es/file3.txt
file_filter = test/fixtures/sources/<lang>/file3.txt
type = TXTTYPE
`;

describe('generateTransifexConfig', () => {
  let generateTransifexConfig;
  let storeFile;

  beforeEach(() => {
    storeFile = sinon.spy();

    generateTransifexConfig = proxyquire(`${ROOT_PATH}/src/index`, {
      './utils/store-file': storeFile
    });
  });

  it('should generate a Transifex config file', () => {
    const params = {
      projectName: 'project-name',
      sourceLocale: 'es',
      sourcePath: FIXTURES_PATH,
      destinationPath: DESTINATION_PATH,
      main: {
        host: 'https://www.transifex.com'
      },
      fileTypes: [
        {
          extension: 'json',
          type: 'KEYVALUEJSON'
        },
        {
          extension: 'txt',
          type: 'TXTTYPE'
        }
      ]
    };

    generateTransifexConfig(params);

    expect(storeFile.callCount).to.be.equal(1);
    expect(storeFile.firstCall.args).to.be.deep.equal([DESTINATION_PATH, EXPECTED_RESPONSE]);
  });
});
