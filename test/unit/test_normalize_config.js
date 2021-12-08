'use strict';

const chai = require('chai');
const expect = chai.expect;

const normalizeConfig = require('src/normalize_config');


describe('unit/normalizeConfig', () => {
  it('returns null for null config', () => {
    const config = null;
    const expected = null;

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes raw off', () => {
    const config = { rules: { rule: 'off' } };

    const expected = { rules: {} };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes embedded off', () => {
    const config = { rules: { rule: ['off', 'something', { key: 'value' }] } };

    const expected = { rules: {} };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces raw 2 with error', () => {
    const config = { rules: { rule: 2 } };

    const expected = { rules: { rule: ['error'] } };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces raw 1 with warning', () => {
    const config = { rules: { rule: 1 } };

    const expected = { rules: { rule: ['warning'] } };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes raw 0', () => {
    const config = { rules: { rule: 0 } };

    const expected = { rules: {} };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces embedded 2 with error', () => {
    const config = { rules: { rule: [2, 'something', { key: 'value' }] } };

    const expected = { rules: { rule: ['error', 'something', { key: 'value' }] } };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('replaces embedded 1 with warning', () => {
    const config = { rules: { rule: [1, 'something', { key: 'value' }] } };

    const expected = { rules: { rule: ['warning', 'something', { key: 'value' }] } };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });

  it('removes embedded 0', () => {
    const config = { rules: { rule: [0, 'something', { key: 'value' }] } };

    const expected = { rules: {} };

    const actual = normalizeConfig(config);
    expect(actual).to.deep.equal(expected);
  });
});
