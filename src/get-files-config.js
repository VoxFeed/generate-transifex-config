const LANG_PLACEHOLDER = '/<lang>/';

function getFilesConfig(files, options) {
  function execute() {
    const { fileTypes = [], sourceLocale } = options || {};
    const fileOptions = buildFileOptions(fileTypes);

    const results = files.map(file => {
      const { name, extension, projectPath } = file;
      const opts = fileOptions[extension];

      if (!opts) return null;

      const { type } = opts;
      return {
        name,
        options: {
          source_lang: sourceLocale,
          source_file: projectPath,
          file_filter: getFileFilter(projectPath, sourceLocale),
          type
        }
      };
    });

    return sortByName(removeEmpty(results));
  }

  function buildFileOptions(fileTypes) {
    return fileTypes.reduce((results, item) => {
      const { extension, type } = item;
      results[extension] = {
        type
      };
      return results;
    }, {});
  }

  function getFileFilter(filePath, sourceLocale) {
    return filePath.replace(`/${sourceLocale}/`, LANG_PLACEHOLDER);
  }

  function removeEmpty(array) {
    return array.filter(el => !!el);
  }

  function sortByName(array) {
    return array.sort((a, b) => a.name > b.name);
  }

  return execute();
}

module.exports = getFilesConfig;
