'use strict';

var chai = require('chai');
var expect = chai.expect;

var getScore = require('src/get_score');


describe('unit/getScore', function() {
  it('returns 100 for empty object', function() {
    var differences = {};
    var actual = getScore(differences);
    expect(actual).to.equal(100);
  });

  it('returns 100 for no differences', function() {
    var differences = {
      rulesMissingFromLeft: [],
      matchingRules: [],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    var actual = getScore(differences);

    expect(actual).to.equal(100);
  });

  it('returns all differences', function() {
    var differences = {
      rulesMissingFromLeft: ['one', 'two', 'three'],
      matchingRules: ['four', 'five'],
      rulesMissingFromRight: ['six', 'seven'],
      ruleDifferences: [{
        rule: 'eight',
        left: ['error', {
          setting: 1,
        }],
        right: 'off',
      }],
    };
    var actual = getScore(differences);

    expect(actual).to.equal(25);
  });

  it('returns minimal differences', function() {
    var differences = {
      rulesMissingFromLeft: [],
      matchingRules: ['one'],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    var actual = getScore(differences);

    expect(actual).to.equal(100);
  });
});
