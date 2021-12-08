'use strict';

/* eslint-disable no-console, import/no-extraneous-dependencies */

var path = require('path');
var eslint = require('eslint');

var ESLint = eslint.ESLint || eslint.CLIEngine;

var engine = new ESLint();
var target = path.join(__dirname, '__random.js');

if (engine.calculateConfigForFile) {
  engine.calculateConfigForFile(target).then(function(config) {
    console.log(JSON.stringify(config, null, '  '));
  });
} else {
  var config = engine.getConfigForFile(target);
  console.log(JSON.stringify(config, null, '  '));
}
