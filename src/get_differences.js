'use strict';

/* eslint-disable security/detect-object-injection */

const _ = require('lodash');
const equal = require('deep-equal');
const deepDiff = require('deep-diff');


function compareRules(leftConfig, rightConfig) {
  const leftRules = _.keys(leftConfig.rules);
  const rightRules = _.keys(rightConfig.rules);

  const leftPlugins = leftConfig.plugins;
  const rightPlugins = rightConfig.plugins;

  const leftExtends = leftConfig.extends;
  const rightExtends = rightConfig.extends;

  const leftClean = _.omit(leftConfig, ['rules', 'plugins', 'extends']);
  const rightClean = _.omit(rightConfig, ['rules', 'plugins', 'extends']);

  const sharedRules = _.intersection(leftRules, rightRules);
  const ruleDifferences = _.chain(sharedRules)
    .map(rule => ({
      rule,
      left: leftConfig.rules[rule],
      right: rightConfig.rules[rule],
    }))
    .reject(item => equal(item.left, item.right))
    .value();
  const ruleDifferenceNames = _.map(ruleDifferences, item => item.rule);
  const matchingRules = _.difference(sharedRules, ruleDifferenceNames);

  return {
    pluginsMissingFromLeft: _.difference(rightPlugins, leftPlugins),
    sharedPlugins: _.intersection(leftPlugins, rightPlugins),
    pluginsMissingFromRight: _.difference(leftPlugins, rightPlugins),

    extendsMissingFromLeft: _.difference(rightExtends, leftExtends),
    sharedExtends: _.intersection(leftExtends, rightExtends),
    extendsMissingFromRight: _.difference(leftExtends, rightExtends),

    rulesMissingFromLeft: _.difference(rightRules, leftRules),
    matchingRules,
    rulesMissingFromRight: _.difference(leftRules, rightRules),
    ruleDifferences,

    differences: deepDiff(leftClean, rightClean) || [],
  };
}

module.exports = compareRules;
