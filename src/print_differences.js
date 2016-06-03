'use strict';

/* eslint-disable no-console */

var util = require('util');


function printDifferences(result) {
  if (!result.rulesMissingFromRight.length && !result.rulesMissingFromLeft.length
    && !result.pluginsMissingFromRight.length && !result.pluginsMissingFromLeft.length
    && !result.ruleDifferences.length && !result.differences.length) {
    console.log('No differences.');
    return;
  }

  printPluginDifferences(result);
  printRuleDifferences(result);
  printOtherDifferences(result);
}

module.exports = printDifferences; // eslint-disable-line

function printPluginDifferences(result) {
  console.log('Plugins missing from right:', result.pluginsMissingFromRight);
  console.log();

  console.log('Plugins missing from left:', result.pluginsMissingFromLeft);
  console.log();
}

function printRuleDifferences(result) {
  console.log('Rules missing from right:', result.rulesMissingFromRight);
  console.log();

  console.log('Rules missing from left:', result.rulesMissingFromLeft);
  console.log();

  console.log('Rule configuration differences:',
    util.inspect(result.ruleDifferences, { depth: 5 }));
  console.log();
}

function printOtherDifferences(result) {
  console.log('Differences in other configuration:', result.differences);
}
