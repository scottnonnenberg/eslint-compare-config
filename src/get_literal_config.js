/* eslint-disable global-require, security/detect-non-literal-require */

'use strict';

var path = require('path');


function getLiteralConfig(leftPath, rightPath) {
  var left = require(path.resolve(leftPath));
  var right = require(path.resolve(rightPath));

  return {
    left: left,
    right: right,
  };
}

module.exports = getLiteralConfig;
