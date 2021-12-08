/* eslint-disable import/no-dynamic-require, security/detect-non-literal-require */

'use strict';

const path = require('path');


function getLiteralConfig(target) {
  return require(path.resolve(target));
}

module.exports = getLiteralConfig;
