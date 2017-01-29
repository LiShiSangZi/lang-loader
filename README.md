# Language Loader
This is a webpack loader which can help to load and parse lang.json file. So that you don't have to pack all your language files.
It is used to help reduce the compiled JS size if you use i18n.

## Install
```bash
npm i --save-dev lang-loader
```
## Usage
### Build your lang.json
```json
{
  "en": {
    "test": "TEST"
  },
  "zh-CN": {
    "test": "测试"
  }
}
```
### webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [{
        loader: 'lang-loader',
        test: /lang.json$/,
        query: {
          language: language
        }
    }]
  }
}
```
### Use it in your file
```javascript
const __ = require('./lang.json');
```
If your language is set to 'en', the __ will look like this:
```javascript
{
  "test": "TEST"
}
```

## Benifit
The benifit of this loader is that you don't have to put all your i18n content in a single JS.
You can generate your JS file for each language like:
en.content.min.js
zh-CN.content.min.js
Then your JS file's size can be reduced.

Have fun!