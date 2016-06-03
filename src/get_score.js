'use strict';

var MAX = 100;

module.exports = function(differences) {
  var totals = {
    rulesMissingFromLeft: getLength(differences.rulesMissingFromLeft),
    sharedRules: getLength(differences.sharedRules),
    rulesMissingFromRight: getLength(differences.rulesMissingFromRight),
    ruleDifferences: getLength(differences.ruleDifferences),
  };

  var totalRules = totals.rulesMissingFromLeft + totals.sharedRules
    + totals.rulesMissingFromRight;
  var unmatched = totals.ruleDifferences + totals.rulesMissingFromLeft
    + totals.rulesMissingFromRight;

  if (totalRules === 0) {
    return MAX;
  }

  return Math.round((totalRules - unmatched) / totalRules * MAX);
};

function getLength(array) {
  if (array) {
    return array.length;
  }

  return 0;
}
