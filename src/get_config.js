'use strict';

var _ = require('lodash');

var eslint = require('eslint');
var plugins = require('eslint/lib/config/plugins');


var CLIEngine = eslint.CLIEngine;

function getConfig(leftPath, rightPath) {
  var engine = new CLIEngine();

  var oldLoad = plugins.load;
  plugins.load = function noop() {};

  var left = _.omit(engine.getConfigForFile(leftPath), ['globals']);
  var right = _.omit(engine.getConfigForFile(rightPath), ['globals']);
  plugins.load = oldLoad;

  return {
    left: left,
    right: right,
  };
}

module.exports = getConfig;
