'use strict';

/* eslint-disable no-sync, security/detect-child-process, security/detect-non-literal-fs-filename */

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');


var script = fs.readFileSync(path.join(__dirname, '_get_config.js')).toString();

function getConfig(startPath) {
  startPath = path.resolve(startPath);

  var stat = fs.statSync(startPath);
  var dir = stat.isDirectory() ? startPath : path.dirname(startPath);
  var filename = '__get_config.js';
  var target = path.join(dir, filename);

  fs.writeFileSync(target, script);
  var components = path.parse(dir);

  var options = {
    cwd: components.root, // enables proper eslint searches for parent configs
  };

  try {
    var result = childProcess.execFileSync('node', [target], options).toString();
    return JSON.parse(result);
  }
  finally {
    fs.unlinkSync(target);
  }
}

module.exports = getConfig;
