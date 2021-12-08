/* eslint-disable no-console */

'use strict';

const dashdash = require('dashdash');
const _ = require('lodash');

const getConfig = require('./get_config');
const getLiteralConfig = require('./get_literal_config');
const getDifferences = require('./get_differences');
const renderDifferences = require('./render_differences');
const normalizeConfig = require('./normalize_config');
const getScore = require('./get_score');


function cli(args) {
  const parser = getParser();
  const parsed = parser.parse(args);

  if (showHelp(parsed, parser)) {
    return;
  }

  if (parsed._args.length !== 2) {
    throw new Error('A comparison needs two configuration paths!');
  }

  const left = parsed._args[0];
  const right = parsed._args[1];
  const config = loadConfig(parsed.literal, left, right);

  const differences = getDifferences(config.left, config.right);

  showDifferences(parsed, differences);
}

module.exports = cli;

function showDifferences(parsed, differences) {
  if (parsed.json) {
    console.log(JSON.stringify(differences, null, '  '));
  }
  else if (parsed.score) {
    console.log(`Score: ${getScore(differences)}% similarity`);
  }
  else {
    console.log(renderDifferences(differences));
  }
}

function showHelp(parsed, parser) {
  if (parsed.help) {
    const optionList = parser.help({ includeEnv: true }).trimRight();
    const help = `usage: eslint-compare-config LEFT RIGHT [OPTIONS]\noptions:\n${
      optionList}`;
    console.log(help);
    return true;
  }

  return false;
}

function loadConfig(literal, left, right) {
  const get = literal ? getLiteralConfig : getConfig;
  const leftConfig = _.omit(get(left), ['globals']);
  const rightConfig = _.omit(get(right), ['globals']);

  return {
    left: normalizeConfig(leftConfig),
    right: normalizeConfig(rightConfig),
  };
}

function getParser() {
  const options = [
    {
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
    },
  ];

  return dashdash.createParser({ options });
}
