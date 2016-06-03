'use strict';

/* eslint-disable no-console */

var path = require('path');

var getDifferences = require('./get_differences');
var renderDifferences = require('./render_differences');
var getConfig = require('./get_config');


var leftPath = path.resolve(process.argv[2]);
var rightPath = path.resolve(process.argv[3]);

console.log('left:', leftPath);
console.log('right:', rightPath);
console.log();

var config = getConfig(leftPath, rightPath);
var result = getDifferences(config.left, config.right);

var text = renderDifferences(result);

console.log(text);
