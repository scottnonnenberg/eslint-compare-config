'use strict';

/* eslint-disable no-console */

var path = require('path');
var eslint = require('eslint');

var CLIEngine = eslint.CLIEngine;

var engine = new CLIEngine();
var target = path.join(__dirname, '__random.js');
var config = engine.getConfigForFile(target);

console.log(JSON.stringify(config, null, '  '));
