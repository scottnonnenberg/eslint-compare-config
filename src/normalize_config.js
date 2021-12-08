'use strict';

const _ = require('lodash');

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
  const name = ruleArray[0];
  let value = ruleArray[1];

  if (_.isArray(value)) {
    value = value.slice(0);
    value[0] = fixRuleValue(value[0]);
  }
  else {
    value = [fixRuleValue(value)];
  }

  return [name, value];
}

function normalizeConfig(config) {
  if (!config) {
    return config;
  }

  const rules = _.chain(config.rules)
    .toPairs()
    .map(fixRule)
    .reject(ruleArray => ruleArray[1] === 'off' || ruleArray[1][0] === 'off')
    .fromPairs()
    .value();

  return _.assign({}, config, { rules });
}

module.exports = normalizeConfig;
