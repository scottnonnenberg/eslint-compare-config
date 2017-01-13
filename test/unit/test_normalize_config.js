'use strict';

var chai = require('chai');
var expect = chai.expect;

var normalizeConfig = require('src/normalize_config');


describe('unit/normalizeConfig', function() {
  it('returns null for null config', function() {
    var config = null;
    var expected = null;

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes raw off', function() {
    var config = {
      rules: {
        rule: 'off',
      },
    };

    var expected = {
      rules: {},
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes embedded off', function() {
    var config = {
      rules: {
        rule: ['off', 'something', {
          key: 'value',
        }],
      },
    };

    var expected = {
      rules: {},
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces raw 2 with error', function() {
    var config = {
      rules: {
        rule: 2,
      },
    };

    var expected = {
      rules: {
        rule: ['error'],
      },
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces raw 1 with warning', function() {
    var config = {
      rules: {
        rule: 1,
      },
    };

    var expected = {
      rules: {
        rule: ['warning'],
      },
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes raw 0', function() {
    var config = {
      rules: {
        rule: 0,
      },
    };

    var expected = {
      rules: {},
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces embedded 2 with error', function() {
    var config = {
      rules: {
        rule: [2, 'something', {
          key: 'value',
        }],
      },
    };

    var expected = {
      rules: {
        rule: ['error', 'something', {
          key: 'value',
        }],
      },
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces embedded 1 with warning', function() {
    var config = {
      rules: {
        rule: [1, 'something', {
          key: 'value',
        }],
      },
    };

    var expected = {
      rules: {
        rule: ['warning', 'something', {
          key: 'value',
        }],
      },
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes embedded 0', function() {
    var config = {
      rules: {
        rule: [0, 'something', {
          key: 'value',
        }],
      },
    };

    var expected = {
      rules: {},
    };

    var actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });
});
