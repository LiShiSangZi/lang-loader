'use strict';

const loaderUtils = require('loader-utils');

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const callback = this.async();

  const query = loaderUtils.parseQuery(this.query);
  const language = query.language;

  const json = source.replace(/(\'|\")use strict(\'|\")\;/, '')
    .replace(/^(.*?)module\.exports(.*?)(\{|\[)/m, '$3').replace(/\;$/, '').trim();

  const obj = JSON.parse(json);
  callback(null, `"use strict"\nmodule.exports = ${JSON.stringify(obj[language])};`);
  // callback(null, source);
};
