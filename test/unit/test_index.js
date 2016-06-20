'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var index = require('index');


describe('unit/index', function() {
  it('has truthy getConfigSync key', function() {
    expect(index).to.have.property('getConfigSync').that.exist;
  });

  it('has truthy getDifferencesSync key', function() {
    expect(index).to.have.property('getDifferencesSync').that.exist;
  });

  it('has truthy getLiteralConfigSync key', function() {
    expect(index).to.have.property('getLiteralConfigSync').that.exist;
  });

  it('has truthy getScoreSync key', function() {
    expect(index).to.have.property('getScoreSync').that.exist;
  });

  it('has truthy normalizeConfigSync key', function() {
    expect(index).to.have.property('normalizeConfigSync').that.exist;
  });

  it('has truthy renderDifferencesSync key', function() {
    expect(index).to.have.property('renderDifferencesSync').that.exist;
  });

  it('has six keys', function() {
    expect(_.keys(index)).to.have.length(6);
  });
});
