/* eslint-disable no-console */

'use strict';

var dashdash = require('dashdash');
var _ = require('lodash');

var getConfig = require('./get_config');
var getLiteralConfig = require('./get_literal_config');
var getDifferences = require('./get_differences');
var renderDifferences = require('./render_differences');
var normalizeConfig = require('./normalize_config');
var getScore = require('./get_score');


function go(args) {
  var parser = getParser();
  var parsed = parser.parse(args);

  if (showHelp(parsed, parser)) {
    return;
  }

  if (parsed._args.length !== 2) {
    throw new Error('A comparison needs two configuration paths!');
  }

  var left = parsed._args[0];
  var right = parsed._args[1];
  var config = loadConfig(parsed.literal, left, right);

  var differences = getDifferences(config.left, config.right);

  showDifferences(parsed, differences);
}

module.exports = go;

function showDifferences(parsed, differences) {
  if (parsed.json) {
    console.log(JSON.stringify(differences, null, '  '));
  }
  else if (parsed.score) {
    console.log('Score: ' + getScore(differences) + '% similarity');
  }
  else {
    console.log(renderDifferences(differences));
  }
}

function showHelp(parsed, parser) {
  if (parsed.help) {
    var optionList = parser.help({ includeEnv: true }).trimRight();
    var help = 'usage: eslint-compare-config LEFT RIGHT [OPTIONS]\noptions:\n'
      + optionList;
    console.log(help);
    return true;
  }

  return false;
}

function loadConfig(literal, left, right) {
  var get = literal ? getLiteralConfig : getConfig;
  var leftConfig = _.omit(get(left), ['globals']);
  var rightConfig = _.omit(get(right), ['globals']);

  return {
    left: normalizeConfig(leftConfig),
    right: normalizeConfig(rightConfig),
  };
}

function getParser() {
  var options = [{
    names: ['help', 'h'],
    type: 'bool',
    help: 'Show this help and exit.',
  }, {
    names: ['literal', 'l'],
    type: 'bool',
    help: 'Load eslint config files directly, not through eslint. Default: false',
  }, {
    names: ['json', 'j'],
    type: 'bool',
    help: 'Show differences in JSON form instead of text. Default: false',
    helpArg: 'NAME',
  }, {
    names: ['score', 's'],
    type: 'bool',
    help: 'Show a similarity score instead of detaile differences. Default: false',
  }];

  return dashdash.createParser({
    options: options,
  });
}
