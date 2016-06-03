'use strict';

/* eslint-disable no-console */

var eslint = require('eslint');
var CLIEngine = eslint.CLIEngine;
var engine = new CLIEngine();
var config = engine.getConfigForFile('__random.js');

console.log(JSON.stringify(config, null, '  '));
