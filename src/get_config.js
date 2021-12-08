'use strict';

/* eslint-disable security/detect-child-process */

const path = require('path');
const { readFileSync, statSync, unlinkSync, writeFileSync } = require('fs');
const childProcess = require('child_process');


const script = readFileSync(path.join(__dirname, '_get_config.js')).toString();

function getConfig(providedPath) {
  const startPath = path.resolve(providedPath);

  const stat = statSync(startPath);
  const dir = stat.isDirectory() ? startPath : path.dirname(startPath);
  const filename = '__get_config.js';
  const target = path.join(dir, filename);

  writeFileSync(target, script);
  const components = path.parse(dir);

  // enables proper eslint searches for parent configs
  const options = { cwd: components.root };

  try {
    const result = childProcess.execFileSync('node', [target], options).toString();
    return JSON.parse(result);
  }
  finally {
    unlinkSync(target);
  }
}

module.exports = getConfig;
