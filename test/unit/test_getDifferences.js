'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var getDifferences = require('src/get_differences');


describe('unit/getDifferences', function() {
  it('returns empty object for empty rules', function() {
    var left = {};
    var right = {};

    var actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);
    expect(actual).to.have.property('differences').that.deep.equal([]);

    expect(_.keys(actual)).to.have.length(6);
  });

  it('property computes rule diffs', function() {
    var left = {
      rules: {
        one: 'error',
        two: 'off',
        three: ['error', {
          setting: 1,
        }],
      },
    };
    var right = {
      rules: {
        two: 'off',
        three: ['error', {
          setting: 2,
        }],
        four: 'error',
      },
    };

    var actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft')
      .that.deep.equal(['four']);
    expect(actual).to.have.property('rulesMissingFromRight')
      .that.deep.equal(['one']);

    expect(actual).to.have.property('ruleDifferences')
      .that.has.length(1)
      .and.deep.equal([{
        rule: 'three',
        left: ['error', {
          setting: 1,
        }],
        right: ['error', {
          setting: 2,
        }],
      }]);

    expect(actual).to.have.property('differences').that.deep.equal([]);
  });

  it('property computes plugin diffs', function() {
    var left = {
      plugins: ['one', 'two'],
    };
    var right = {
      plugins: ['two', 'three'],
    };

    var actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft')
      .that.deep.equal(['three']);
    expect(actual).to.have.property('pluginsMissingFromRight')
      .that.deep.equal(['one']);

    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);

    expect(actual).to.have.property('differences').that.deep.equal([]);
  });

  it('property computes diffs for the rest of the config', function() {
    var left = {
      settings: {
        react: {
          version: '15',
        },
      },
      parser: 'babel-eslint',
    };
    var right = {
      settings: {
        react: {
          version: '14',
        },
      },
    };

    var actual = getDifferences(left, right);

    expect(actual).to.have.property('pluginsMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('pluginsMissingFromRight').that.deep.equal([]);

    expect(actual).to.have.property('rulesMissingFromLeft').that.deep.equal([]);
    expect(actual).to.have.property('rulesMissingFromRight').that.deep.equal([]);
    expect(actual).to.have.property('ruleDifferences').that.deep.equal([]);

    expect(actual).to.have.property('differences')
      .that.has.length(2)
      .and.deep.equal([{
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
        path: [
          'parser',
        ],
      }]);
  });
});
