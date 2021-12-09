'use strict';

const chai = require('chai');
const expect = chai.expect;
const strip = require('strip-ansi');

const renderDifferences = require('src/render_differences');


describe('unit/renderDifferences', () => {
  it('throws if provided null object', () => {
    const differences = null;
    expect(() => {
      renderDifferences(differences);
    }).to.throw(Error)
      .that.match(/need to provide/);
  });

  it('handles empty object', () => {
    const differences = {};
    const actual = renderDifferences(differences);
    expect(actual).to.equal('No differences.');
  });

  it('returns "No differences" for empty object', () => {
    const differences = {
      pluginsMissingFromLeft: [],
      pluginsMissingFromRight: [],
      extendsMissingFromLeft: [],
      extendsMissingFromRight: [],
      rulesMissingFromLeft: [],
      rulesMissingFromRight: [],
      ruleDifferences: [],
      differences: [],
    };

    const actual = renderDifferences(differences);

    expect(actual).to.equal('No differences.');
  });

  it('returns all differences', () => {
    const differences = {
      pluginsMissingFromLeft: ['one', 'two'],
      pluginsMissingFromRight: ['three', 'four'],
      extendsMissingFromLeft: ['_one', '_two'],
      extendsMissingFromRight: ['_three', '_four'],
      rulesMissingFromLeft: ['+one', '+two'],
      rulesMissingFromRight: ['+three', '+four'],
      ruleDifferences: [
        {
          rule: 'five',
          left: ['error', { setting: 1 }],
          right: 'off',
        },
      ],
      differences: [
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
      ],
    };
    const expected =
      'Plugins shared: None\n'
      + '\n'
      + 'Plugins missing from left: 2\n'
      + '  one\n'
      + '  two\n'
      + '\n'
      + 'Plugins missing from right: 2\n'
      + '  three\n'
      + '  four\n'
      + '\n'
      + 'Extends shared: None\n'
      + '\n'
      + 'Extends missing from left: 2\n'
      + '  _one\n'
      + '  _two\n'
      + '\n'
      + 'Extends missing from right: 2\n'
      + '  _three\n'
      + '  _four\n'
      + '\n'
      + 'Rules matching: None\n'
      + '\n'
      + 'Rules missing from left: 2\n'
      + '  +one\n'
      + '  +two\n'
      + '\n'
      + 'Rules missing from right: 2\n'
      + '  +three\n'
      + '  +four\n'
      + '\n'
      + 'Rule configuration differences: 1\n'
      + '  five:\n'
      + '    left: [ \'error\', { setting: 1 } ]\n'
      + '    right: \'off\'\n'
      + '\n'
      + 'Differences in other configuration: 2\n'
      + '  settings.react.version:\n'
      + '    left: \'15\'\n'
      + '    right: \'14\'\n'
      + '  parser:\n'
      + '    left: \'babel-eslint\'\n'
      + '    right: undefined';

    const actual = renderDifferences(differences);

    const stripped = strip(actual);
    expect(stripped).to.equal(expected);
  });

  it('returns minimal differences', () => {
    const differences = {
      pluginsMissingFromLeft: ['one'],
      pluginsMissingFromRight: [],
      rulesMissingFromLeft: [],
      rulesMissingFromRight: [],
      ruleDifferences: [],
      differences: [],
    };
    const expected =
      'Plugins shared: None\n'
      + '\n'
      + 'Plugins missing from left: 1\n'
      + '  one\n'
      + '\n'
      + 'Plugins missing from right: None\n'
      + '\n'
      + 'Extends shared: None\n'
      + '\n'
      + 'Extends missing from left: None\n'
      + '\n'
      + 'Extends missing from right: None\n'
      + '\n'
      + 'Rules matching: None\n'
      + '\n'
      + 'Rules missing from left: None\n'
      + '\n'
      + 'Rules missing from right: None\n'
      + '\n'
      + 'Rule configuration differences: None\n'
      + '\n'
      + 'Differences in other configuration: None';

    const actual = renderDifferences(differences);

    const stripped = strip(actual);
    expect(stripped).to.equal(expected);
  });
});
