'use strict';

/* eslint-disable security/detect-object-injection */

var _ = require('lodash');
var equal = require('deep-equal');
var deepDiff = require('deep-diff');


function compareRules(leftConfig, rightConfig) {
  var leftRules = _.keys(leftConfig.rules);
  var rightRules = _.keys(rightConfig.rules);

  var leftPlugins = leftConfig.plugins;
  var rightPlugins = rightConfig.plugins;

  var leftClean = _.omit(leftConfig, ['rules', 'plugins']);
  var rightClean = _.omit(rightConfig, ['rules', 'plugins']);

  var sharedRules = _.intersection(leftRules, rightRules);

  return {
    pluginsMissingFromLeft: _.difference(rightPlugins, leftPlugins),
    sharedPlugins: _.intersection(leftPlugins, rightPlugins),
    pluginsMissingFromRight: _.difference(leftPlugins, rightPlugins),

    rulesMissingFromLeft: _.difference(rightRules, leftRules),
    sharedRules: _.intersection(leftRules, rightRules),
    rulesMissingFromRight: _.difference(leftRules, rightRules),
    ruleDifferences: _.chain(sharedRules)
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
      .value(),

    differences: deepDiff(leftClean, rightClean) || [],
  };
}

module.exports = compareRules;
