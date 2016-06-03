'use strict';

/* eslint-disable no-console */

var path = require('path');

var getDifferences = require('./get_differences');
var renderDifferences = require('./render_differences');
var getLiteralConfig = require('./get_literal_config');

var leftPath = path.resolve(process.argv[2]);
var rightPath = path.resolve(process.argv[3]);

var config = getLiteralConfig(leftPath, rightPath);
var result = getDifferences(config.left, config.right);

var text = renderDifferences(result);

console.log(text);
