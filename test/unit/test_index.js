'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var index = require('index');


describe('unit/index', function() {
  it('has truthy getDifferences key', function() {
    expect(index).to.have.property('getDifferences').that.exist;
  });

  it('has truthy renderDifferences key', function() {
    expect(index).to.have.property('renderDifferences').that.exist;
  });

  it('has two keys', function() {
    expect(_.keys(index)).to.have.length(2);
  });
});
