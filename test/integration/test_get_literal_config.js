'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var getConfig = require('src/get_literal_config');


describe('integration/getLiteralConfig', function() {
  it('loads two config files', function() {
    var left = 'test/integration/left/.eslintrc.js';
    var right = 'test/integration/right/.eslintrc.js';

    var actual = getConfig(left, right);

    expect(actual).to.have.all.keys('left', 'right');

    expect(_.keys(actual.left.rules)).to.have.length(3);
    expect(_.keys(actual.right.rules)).to.have.length(3);

    expect(actual).to.have.deep.property('left.extends').that.has.length(1);
    expect(actual).to.have.deep.property('right.extends').that.has.length(1);

    expect(actual).not.to.have.deep.property('left.plugins');
    expect(actual).to.have.deep.property('right.plugins').that.has.length(2);
  });
});
