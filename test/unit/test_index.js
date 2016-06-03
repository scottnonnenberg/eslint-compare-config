'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var index = require('index');


describe('unit/index', function() {
  it('has truthy getConfig key', function() {
    expect(index).to.have.property('getConfig').that.exist;
  });

  it('has truthy getDifferences key', function() {
    expect(index).to.have.property('getDifferences').that.exist;
  });

  it('has truthy getLiteralConfig key', function() {
    expect(index).to.have.property('getLiteralConfig').that.exist;
  });

  it('has truthy getScore key', function() {
    expect(index).to.have.property('getScore').that.exist;
  });

  it('has truthy renderDifferences key', function() {
    expect(index).to.have.property('renderDifferences').that.exist;
  });

  it('has two keys', function() {
    expect(_.keys(index)).to.have.length(5);
  });
});
