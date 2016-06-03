'use strict';

var util = require('util');
var chalk = require('chalk');


var INDENT = '  ';
var JOIN = '\n' + INDENT;
var SEPARATOR = '\n\n';

function renderDifferences(result) {
  if (!result.rulesMissingFromRight.length && !result.rulesMissingFromLeft.length
    && !result.pluginsMissingFromRight.length && !result.pluginsMissingFromLeft.length
    && !result.ruleDifferences.length && !result.differences.length) {
    return 'No differences.';
  }

  return printPluginDifferences(result)
    + SEPARATOR
    + printRuleDifferences(result)
    + SEPARATOR
    + printOtherDifferences(result);
}

module.exports = renderDifferences;

function bold(item) {
  return chalk.bold(item);
}

function joinOrNone(array) {
  if (array.length) {
    return '\n' + INDENT + array.join(JOIN);
  }

  return chalk.dim(' None');
}

function printPluginDifferences(result) {
  return 'Plugins missing from left:'
    + joinOrNone(result.pluginsMissingFromLeft.map(bold))
    + SEPARATOR
    + 'Plugins missing from right:'
    + joinOrNone(result.pluginsMissingFromRight.map(bold));
}

function printRuleDifferences(result) {
  return 'Rules missing from left:'
    + joinOrNone(result.rulesMissingFromLeft.map(bold))
    + SEPARATOR
    + 'Rules missing from right:'
    + joinOrNone(result.rulesMissingFromRight.map(bold))
    + SEPARATOR
    + 'Rule configuration differences:'
    + joinOrNone(result.ruleDifferences.map(printRuleDifference));
}

function printRuleDifference(rule) {
  var left = util.inspect(rule.left);
  var right = util.inspect(rule.right);

  var leftIndent = left.split('\n').join(JOIN + INDENT);
  var rightIndent = right.split('\n').join(JOIN + INDENT);

  return bold(rule.rule) + ':\n'
     + INDENT + INDENT + 'left: ' + leftIndent + '\n'
     + INDENT + INDENT + 'right: ' + rightIndent;
}

function printOtherDifferences(result) {
  return 'Differences in other configuration:'
    + joinOrNone(result.differences.map(renderDiff));
}

function renderDiff(diff) {
  var left = util.inspect(diff.lhs);
  var right = util.inspect(diff.rhs);

  var leftIndent = left.split('\n').join(JOIN + INDENT);
  var rightIndent = right.split('\n').join(JOIN + INDENT);

  var path = diff.path.join('.');

  return bold(path) + ':\n'
     + INDENT + INDENT + 'left: ' + leftIndent + '\n'
     + INDENT + INDENT + 'right: ' + rightIndent;
}
