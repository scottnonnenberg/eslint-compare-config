'use strict';

var path = require('path');

var getDifferences = require('./getDifferences');
var printDifferences = require('./printDifferences');
var getLiteralConfig = require('./getLiteralConfig');

var leftPath = path.resolve(process.argv[2]);
var rightPath = path.resolve(process.argv[3]);

var config = getLiteralConfig(leftPath, rightPath);
var result = getDifferences(config.left, config.right);

printDifferences(result);
