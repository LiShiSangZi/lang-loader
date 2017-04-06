'use strict';

const loaderUtils = require('loader-utils');

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const callback = this.async();

  const query = loaderUtils.parseQuery(this.query);
  const language = query.language;

  const useStrictExp = /(\'|\")use strict(\'|\")\;/;
  const useExportsExp = /^(.*?)module\.exports(.*?)(\{|\[)/m;

  const useStrict = useStrictExp.test(source);
  const useExports = useExportsExp.test(source);

  const json = source.replace(useStrictExp, '')
    .replace(useExportsExp, '$3').replace(/\;$/, '').trim();

  const obj = JSON.parse(json);
  const res = [];
  if (useStrict) {
    res[0] = '"use strict"\n';
  }
  if (useExports) {
    res.push(`module.exports = ${JSON.stringify(obj[language])};`);
  } else {
    res.push(JSON.stringify(obj[language]));
  }
  callback(null, res.join(''));
};
