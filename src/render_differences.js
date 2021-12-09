'use strict';

const util = require('util');
const chalk = require('chalk');
const _ = require('lodash');


const INDENT = '  ';
const JOIN = `\n${INDENT}`;
const SEPARATOR = '\n\n';

function renderDifferences(result) {
  if (!result) {
    throw new Error('need to provide the differences!');
  }

  if (noLength(result.rulesMissingFromLeft)
    && noLength(result.rulesMissingFromRight)
    && noLength(result.extendsMissingFromLeft)
    && noLength(result.extendsMissingFromRight)
    && noLength(result.pluginsMissingFromLeft)
    && noLength(result.pluginsMissingFromRight)
    && noLength(result.ruleDifferences)
    && noLength(result.differences)) {
    return 'No differences.';
  }

  return printPluginDifferences(result)
    + SEPARATOR
    + printExtendsDifferences(result)
    + SEPARATOR
    + printRuleDifferences(result)
    + SEPARATOR
    + printOtherDifferences(result);
}

module.exports = renderDifferences;

function noLength(array) {
  return !array || !array.length;
}

function bold(item) {
  return chalk.bold(item);
}

function joinOrNone(array) {
  if (array.length) {
    return ` ${array.length}\n${INDENT}${array.join(JOIN)}`;
  }

  return chalk.dim(' None');
}

/* eslint-disable prefer-template */

function printPluginDifferences(result) {
  return 'Plugins shared:'
    + joinOrNone(_.map(result.sharedPlugins, bold))
    + SEPARATOR
    + 'Plugins missing from left:'
    + joinOrNone(_.map(result.pluginsMissingFromLeft, bold))
    + SEPARATOR
    + 'Plugins missing from right:'
    + joinOrNone(_.map(result.pluginsMissingFromRight, bold));
}

function printExtendsDifferences(result) {
  return 'Extends shared:'
    + joinOrNone(_.map(result.sharedExtends, bold))
    + SEPARATOR
    + 'Extends missing from left:'
    + joinOrNone(_.map(result.extendsMissingFromLeft, bold))
    + SEPARATOR
    + 'Extends missing from right:'
    + joinOrNone(_.map(result.extendsMissingFromRight, bold));
}


function printRuleDifferences(result) {
  return 'Rules matching:'
    + joinOrNone(_.map(result.matchingRules, bold))
    + SEPARATOR
    + 'Rules missing from left:'
    + joinOrNone(_.map(result.rulesMissingFromLeft, bold))
    + SEPARATOR
    + 'Rules missing from right:'
    + joinOrNone(_.map(result.rulesMissingFromRight, bold))
    + SEPARATOR
    + 'Rule configuration differences:'
    + joinOrNone(_.map(result.ruleDifferences, printRuleDifference));
}

function printRuleDifference(rule) {
  const left = util.inspect(rule.left);
  const right = util.inspect(rule.right);

  const leftIndent = left.split('\n').join(JOIN + INDENT);
  const rightIndent = right.split('\n').join(JOIN + INDENT);

  return bold(rule.rule) + ':\n'
     + INDENT + INDENT + 'left: ' + leftIndent + '\n'
     + INDENT + INDENT + 'right: ' + rightIndent;
}

function printOtherDifferences(result) {
  return 'Differences in other configuration:'
    + joinOrNone(_.map(result.differences, renderDiff));
}

function renderDiff(diff) {
  const left = util.inspect(diff.lhs);
  const right = util.inspect(diff.rhs);

  const leftIndent = left.split('\n').join(JOIN + INDENT);
  const rightIndent = right.split('\n').join(JOIN + INDENT);

  const path = diff.path.join('.');

  return bold(path) + ':\n'
     + INDENT + INDENT + 'left: ' + leftIndent + '\n'
     + INDENT + INDENT + 'right: ' + rightIndent;
}
