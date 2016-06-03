'use strict';

var chai = require('chai');
var expect = chai.expect;

var getScore = require('src/get_score');


describe('unit/getScore', function() {
  it('returns 100 for no differences', function() {
    var differences = {
      rulesMissingFromLeft: [],
      sharedRules: [],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    var actual = getScore(differences);

    expect(actual).to.equal(100);
  });

  it('returns all differences', function() {
    var differences = {
      rulesMissingFromLeft: ['one', 'two'],
      sharedRules: ['three', 'four'],
      rulesMissingFromRight: ['five', 'six'],
      ruleDifferences: [{
        rule: 'five',
        left: ['error', {
          setting: 1,
        }],
        right: 'off',
      }],
    };
    var actual = getScore(differences);

    expect(actual).to.equal(17);
  });

  it('returns minimal differences', function() {
    var differences = {
      rulesMissingFromLeft: [],
      sharedRules: ['one'],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    var actual = getScore(differences);

    expect(actual).to.equal(100);
  });
});
