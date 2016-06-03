'use strict';

/* eslint-disable global-require, security/detect-non-literal-require */

function getLiteralConfig(leftPath, rightPath) {
  var left = require(leftPath);
  var right = require(rightPath);

  return {
    left: left,
    right: right,
  };
}

module.exports = getLiteralConfig;
