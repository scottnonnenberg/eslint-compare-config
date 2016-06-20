'use strict';

/* eslint-disable security/detect-object-injection, max-statements */

var _ = require('lodash');
var equal = require('deep-equal');
var deepDiff = require('deep-diff');


function compareRules(leftConfig, rightConfig) {
  var leftRules = _.keys(leftConfig.rules);
  var rightRules = _.keys(rightConfig.rules);

  var leftPlugins = leftConfig.plugins;
  var rightPlugins = rightConfig.plugins;

  var leftExtends = leftConfig.extends;
  var rightExtends = rightConfig.extends;

  var leftClean = _.omit(leftConfig, ['rules', 'plugins', 'extends']);
  var rightClean = _.omit(rightConfig, ['rules', 'plugins', 'extends']);

  var sharedRules = _.intersection(leftRules, rightRules);
  var ruleDifferences = _.chain(sharedRules)
    .map(function(rule) {
      return {
        rule: rule,
        left: leftConfig.rules[rule],
        right: rightConfig.rules[rule],
      };
    })
    .reject(function(item) {
      return equal(item.left, item.right);
    })
    .value();
  var ruleDifferenceNames = _.map(ruleDifferences, function(item) {
    return item.rule;
  });
  var matchingRules = _.difference(sharedRules, ruleDifferenceNames);

  return {
    pluginsMissingFromLeft: _.difference(rightPlugins, leftPlugins),
    sharedPlugins: _.intersection(leftPlugins, rightPlugins),
    pluginsMissingFromRight: _.difference(leftPlugins, rightPlugins),

    extendsMissingFromLeft: _.difference(rightExtends, leftExtends),
    sharedExtends: _.intersection(leftExtends, rightExtends),
    extendsMissingFromRight: _.difference(leftExtends, rightExtends),

    rulesMissingFromLeft: _.difference(rightRules, leftRules),
    matchingRules: matchingRules,
    rulesMissingFromRight: _.difference(leftRules, rightRules),
    ruleDifferences: ruleDifferences,

    differences: deepDiff(leftClean, rightClean) || [],
  };
}

module.exports = compareRules;
