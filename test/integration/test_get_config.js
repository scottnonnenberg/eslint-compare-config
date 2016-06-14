'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var getConfig = require('src/get_config');


describe('integration/getConfig', function() {
  it('loads two config files', function() {
    var left = 'test/integration/left';
    var right = 'test/integration/right';

    var actual = getConfig(left, right);

    expect(actual).to.have.all.keys('left', 'right');

    expect(_.keys(actual.left.rules)).to.have.length.above(3);
    expect(_.keys(actual.right.rules)).to.have.length.above(3);

    expect(actual).to.have.deep.property('left.extends').that.has.length(1);
    expect(actual).to.have.deep.property('right.extends').that.has.length(1);

    expect(actual).to.have.deep.property('left.plugins').that.has.length.above(0);
    expect(actual).to.have.deep.property('right.plugins').that.has.length.above(2);
  });
});
