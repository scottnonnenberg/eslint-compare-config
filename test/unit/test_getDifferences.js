'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var getDifferences = require('src/getDifferences');


describe('unit/getDifferences', function() {
  it('returns empty object for empty rules', function() {
    var left = {};
    var right = {};

    var actual = getDifferences(left, right);

    expect(actual).to.have.property('differences').that.exist;
    expect(actual).to.have.property('pluginsMissingFromRight').that.exist;
    expect(actual).to.have.property('pluginsMissingFromLeft').that.exist;
    expect(actual).to.have.property('rulesMissingFromRight').that.exist;
    expect(actual).to.have.property('rulesMissingFromLeft').that.exist;
    expect(actual).to.have.property('ruleDifferences').that.exist;

    expect(_.keys(actual)).to.have.length(6);
  });
});
