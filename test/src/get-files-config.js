const getFilesConfig = require(`${ROOT_PATH}/src/get-files-config`);

const FILE_1 = {
  name: 'file1-json',
  extension: 'json',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/sources/file1.json',
  projectPath: 'test/fixtures/es/file1.json'
};

const FILE_2 = {
  name: 'file2-json',
  extension: 'json',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/es/file2.json',
  projectPath: 'test/fixtures/es/file2.json'
};

const FILE_3 = {
  name: 'file3-txt',
  extension: 'txt',
  fullPath: '/Users/manuelmhtr/Projects/generate-transifex-config/test/fixtures/es/file3.txt',
  projectPath: 'test/fixtures/es/file3.txt'
};

const EXPECTED_RESPONSE_1 = {
  name: 'file1-json',
  options: {
    type: 'JSONTYPE',
    file_filter: 'test/fixtures/<lang>/file1.json',
    source_file: 'test/fixtures/es/file1.json',
    source_lang: 'es'
  }
};

const EXPECTED_RESPONSE_2 = {
  name: 'file2-json',
  options: {
    type: 'JSONTYPE',
    file_filter: 'test/fixtures/<lang>/file2.json',
    source_file: 'test/fixtures/es/file2.json',
    source_lang: 'es'
  }
};

const EXPECTED_RESPONSE_3 = {
  name: 'file3-txt',
  options: {
    type: 'TEXTTYPE',
    file_filter: 'test/fixtures/<lang>/file3.txt',
    source_file: 'test/fixtures/es/file3.txt',
    source_lang: 'es'
  }
};

describe('getFilesConfig', () => {
  it('should parse each file and return its config', () => {
    const expectedResponse = [
      EXPECTED_RESPONSE_1,
      EXPECTED_RESPONSE_2,
      EXPECTED_RESPONSE_3
    ];

    const options = {
      sourceLocale: 'es',
      fileTypes: [{
        extension: 'json',
        type: 'JSONTYPE'
      }, {
        extension: 'txt',
        type: 'TEXTTYPE'
      }]
    };
    const files = [FILE_1, FILE_2, FILE_3];
    const actualResponse = getFilesConfig(files, options);
    expect(actualResponse).to.be.deep.equal(expectedResponse);
  });

  it('should skip not specified file types', () => {
    const expectedResponse = [
      EXPECTED_RESPONSE_3
    ];

    const options = {
      sourceLocale: 'es',
      fileTypes: [{
        extension: 'txt',
        type: 'TEXTTYPE'
      }]
    };
    const files = [FILE_1, FILE_2, FILE_3];
    const actualResponse = getFilesConfig(files, options);
    expect(actualResponse).to.be.deep.equal(expectedResponse);
  });

  it('should return empty array when not sending config for any file type', () => {
    const expectedResponse = [];
    const options = {
      sourceLocale: 'es',
      fileTypes: []
    };
    const files = [FILE_1, FILE_2, FILE_3];
    const actualResponse = getFilesConfig(files, options);
    expect(actualResponse).to.be.deep.equal(expectedResponse);
  });
});
