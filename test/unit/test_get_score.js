'use strict';

const chai = require('chai');
const expect = chai.expect;

const getScore = require('src/get_score');


describe('unit/getScore', () => {
  it('returns 100 for empty object', () => {
    const differences = {};
    const actual = getScore(differences);
    expect(actual).to.equal(100);
  });

  it('returns 100 for no differences', () => {
    const differences = {
      rulesMissingFromLeft: [],
      matchingRules: [],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    const actual = getScore(differences);

    expect(actual).to.equal(100);
  });

  it('returns all differences', () => {
    const differences = {
      rulesMissingFromLeft: ['one', 'two', 'three'],
      matchingRules: ['four', 'five'],
      rulesMissingFromRight: ['six', 'seven'],
      ruleDifferences: [
        {
          rule: 'eight',
          left: ['error', { setting: 1 }],
          right: 'off',
        },
      ],
    };
    const actual = getScore(differences);

    expect(actual).to.equal(25);
  });

  it('returns minimal differences', () => {
    const differences = {
      rulesMissingFromLeft: [],
      matchingRules: ['one'],
      rulesMissingFromRight: [],
      ruleDifferences: [],
    };

    const actual = getScore(differences);

    expect(actual).to.equal(100);
  });
});
