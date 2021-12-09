

'use strict';

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const getDifferences = require('src/get_differences');


describe('unit/getDifferences', () => {
  it('returns empty object for empty rules', () => {
    const left = {};
    const right = {};

    const actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedPlugins').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('extendsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedExtends').that.deep.equal([]);
    expect(actual).to.have.property('extendsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('matchingRules').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);

    expect(actual).to.have.property('differences').that.deep.equal([]);

    expect(_.keys(actual)).to.have.length(11);
  });

  it('property computes rule diffs', () => {
    const left = {
      rules: {
        one: 'error',
        two: 'off',
        three: ['error', { setting: 1 }],
        four: 'error',
      },
    };
    const right = {
      rules: {
        two: 'off',
        three: ['error', { setting: 2 }],
        four: 'error',
        five: 'error',
      },
    };

    const actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedPlugins').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('extendsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedExtends').that.deep.equal([]);
    expect(actual).to.have.property('extendsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft')
      .that.deep.equal(['five']);
    expect(actual).to.have.property('matchingRules')
      .that.deep.equal(['two', 'four']);
    expect(actual).to.have.property('rulesMissingFromRight')
      .that.deep.equal(['one']);
    expect(actual).to.have.property('ruleDifferences')
      .that.has.length(1)
      .and.deep.equal([
        {
          rule: 'three',
          left: ['error', { setting: 1 }],
          right: ['error', { setting: 2 }],
        },
      ]);

    expect(actual).to.have.property('differences').that.deep.equal([]);
  });

  it('property computes plugin diffs', () => {
    const left = { plugins: ['one', 'two'] };
    const right = { plugins: ['two', 'three'] };

    const actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft')
      .that.deep.equal(['three']);
    expect(actual).to.have.property('sharedPlugins')
      .that.deep.equal(['two']);
    expect(actual).to.have.property('pluginsMissingFromRight')
      .that.deep.equal(['one']);

    expect(actual).to.have.property('extendsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedExtends').that.deep.equal([]);
    expect(actual).to.have.property('extendsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('matchingRules').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);

    expect(actual).to.have.property('differences').that.deep.equal([]);
  });

  it('property computes diffs for the rest of the config', () => {
    const left = {
      settings: { react: { version: '15' } },
      parser: 'babel-eslint',
    };
    const right = { settings: { react: { version: '14' } } };

    const actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedPlugins').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('extendsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('sharedExtends').that.deep.equal([]);
    expect(actual).to.have.property('extendsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('matchingRules').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);

    expect(actual).to.have.property('differences')
      .that.has.length(2)
      .and.deep.equal([
        {
          kind: 'E',
          lhs: '15',
          path: [
            'settings',
            'react',
            'version',
          ],
          rhs: '14',
        }, {
          kind: 'D',
          lhs: 'babel-eslint',
          path: ['parser'],
        },
      ]);
  });
});
