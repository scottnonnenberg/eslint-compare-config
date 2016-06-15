'use strict';

var _ = require('lodash');

function fixRuleValue(value) {
  if (value === 0) {
    return 'off';
  }
  else if (value === 1) {
    return 'warning';
  }
  else if (value === 2) {
    return 'error';
  }
  return value;
}

function fixRule(ruleArray) {
  var name = ruleArray[0];
  var value = ruleArray[1];

  if (_.isArray(value)) {
    value = value.slice(0);
    value[0] = fixRuleValue(value[0]);
  }
  else {
    value = fixRuleValue(value);
  }

  return [name, value];
}

function normalizeConfig(config) {
  if (!config) {
    return config;
  }

  var rules = _.chain(config.rules)
    .toPairs()
    .map(fixRule)
    .reject(function(ruleArray) {
      return ruleArray[1] === 'off' || ruleArray[1][0] === 'off';
    })
    .fromPairs()
    .value();

  return _.assign({}, config, { rules: rules });
}

module.exports = normalizeConfig;
