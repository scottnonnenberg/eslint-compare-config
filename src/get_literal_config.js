/* eslint-disable global-require, security/detect-non-literal-require */

'use strict';

var path = require('path');


function getLiteralConfig(target) {
  return require(path.resolve(target));
}

module.exports = getLiteralConfig;
