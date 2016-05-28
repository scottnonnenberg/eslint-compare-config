'use strict';

/* eslint-disable no-console */

var path = require('path');

var getDifferences = require('./getDifferences');
var printDifferences = require('./printDifferences');
var getConfig = require('./getConfig');


var leftPath = path.resolve(process.argv[2]);
var rightPath = path.resolve(process.argv[3]);

console.log('left:', leftPath);
console.log('right:', rightPath);
console.log();

var config = getConfig(leftPath, rightPath);
var result = getDifferences(config.left, config.right);

printDifferences(result);

