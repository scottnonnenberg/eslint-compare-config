'use strict';

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const index = require('index');


describe('unit/index', () => {
  it('has truthy getConfigSync key', () => {
    expect(index).to.have.property('getConfigSync').that.exist;
  });

  it('has truthy getDifferencesSync key', () => {
    expect(index).to.have.property('getDifferencesSync').that.exist;
  });

  it('has truthy getLiteralConfigSync key', () => {
    expect(index).to.have.property('getLiteralConfigSync').that.exist;
  });

  it('has truthy getScoreSync key', () => {
    expect(index).to.have.property('getScoreSync').that.exist;
  });

  it('has truthy normalizeConfigSync key', () => {
    expect(index).to.have.property('normalizeConfigSync').that.exist;
  });

  it('has truthy renderDifferencesSync key', () => {
    expect(index).to.have.property('renderDifferencesSync').that.exist;
  });

  it('has six keys', () => {
    expect(_.keys(index)).to.have.length(6);
  });
});
