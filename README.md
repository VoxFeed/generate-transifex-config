# Generate [Transifex](https://www.transifex.com/) config

This module generates a Transifex CLI client config file (.tx/config) for a whole project.

Usually there’s need to run a client command for each file or add them to `.tx/config` manually, one by one. This project makes it easier for projects with multiple language files.

See [Transifex command line client](https://docs.transifex.com/client/introduction) to learn more of this feature.


### Installation

```
npm install --save-dev generate-transifex-config
```

### Usage

This module exports a function that receives an object with parameters:

| Parameter  | Type | Description |
| ------------- | ------------- | ----------------- |
| projectName  | string | Is the url name from the Transifex project to be updated. |
| sourceLocale | string | The locale (language) of your source files. |
| sourcePath | string | The path to the folder where all **source** language files are located. |
| destinationPath | string | The path to the file where config will be stored (a file with the same name will be overwritten). |
| main | object | An object containg all configuration for the "main" block (needed by Transifex client). |
| fileTypes | array | An array with configuration for each file type. |
| fileTypes.extension | string | The extension that will filter the files to apply this configuration. |
| fileTypes.type | string | The Transifex type for the files matching the extension (see Transifex docs). |

### Example

Given a project where language files are organized as following:

```
i18n/
  |-en/
  |  |-file1.json
  |  |-file2.json
  |  \-subfolder
  |     \-file3.md
  \-es/
    ...
```

The module can be used like this:

```javascript
const generateTransifexConfig = require('generate-transifex-config');

const params = {
  projectName: 'my-project',
  sourceLocale: 'en',
  sourcePath: '/my-project/i18n/en/',
  destinationPath: '/my-project/.tx/config',
  main: {
    host: 'https://www.transifex.com'
  },
  fileTypes: [
    {
      extension: 'json',
      type: 'KEYVALUEJSON'
    },
    {
      extension: 'md',
      type: 'MARKDOWN'
    }
  ]
};

generateTransifexConfig(params);
```

This will generate the file `/my-project/.tx/config`, containing:

```
[main]
host = https://www.transifex.com

[my-project.file1-json]
type = KEYVALUEJSON
file_filter = i18n/<lang>/file1.json
source_file = i18n/es/file1.json
source_lang = en

[my-project.file2-json]
type = KEYVALUEJSON
file_filter = i18n/<lang>/file2.json
source_file = i18n/es/file2.json
source_lang = en

[my-project.subfolder-file3-md]
type = MARKDOWN
file_filter = i18n/<lang>/subfolder/file3.md
source_file = i18n/es/subfolder/file3.md
source_lang = en
```

💡 **Pro-tip:** You can create a file `generate-config.js` in .tx folder with the required parameters and a call to this module. That way anybody in your team just need to run:

```
node .tx/generate-config.js
```

...and the `.tx/config` file will be updated.

### Testing

```
npm test
```

### Contribution

Anybody is welcome to contribute. Just please follow the rules:

- Stick to the same code style.
- Include enough tests.
- Update README if necessary.

### License

MIT