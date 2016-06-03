'use strict';

/* eslint-disable no-sync */

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');

var _ = require('lodash');


var script = fs.readFileSync(path.join(__dirname, '_get_config.js')).toString();

function getConfig(leftPath, rightPath) {
  var leftDir = path.dirname(path.resolve(leftPath));
  var rightDir = path.dirname(path.resolve(rightPath));

  // what I actually need to do here is put a s file on disk in the target directory and
  // run it, so it has the right require bindings. ugh. I guess I should consider it fun. :0)

  var left = getConfigForDir(leftDir);
  var right = getConfigForDir(rightDir);

  return {
    left: _.omit(left, ['globals']),
    right: _.omit(right, ['globals']),
  };
}

function getConfigForDir(dir) {
  var filename = '__get_config.js';
  var target = path.join(dir, filename);

  fs.writeFileSync(target, script);

  var options = {
    cwd: dir,
  };
  var result = childProcess.execFileSync('node', [target], options).toString();

  fs.unlinkSync(target);

  return JSON.parse(result);
}

module.exports = getConfig;
