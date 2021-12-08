'use strict';

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const getConfig = require('src/get_config');


describe('integration/getConfig', () => {
  it('loads two config files', () => {
    const left = 'test/integration/left';
    const right = 'test/integration/right';

    const actual = {
      left: getConfig(left),
      right: getConfig(right),
    };

    expect(actual).to.have.all.keys('left', 'right');

    expect(_.keys(actual.left.rules)).to.have.length.above(3);
    expect(_.keys(actual.right.rules)).to.have.length.above(3);

    expect(actual.left)
      .to.have.deep.property('plugins').that.has.length.above(0, 'left');
    expect(actual.right)
      .to.have.deep.property('plugins').that.has.length.above(2, 'right');
  });
});
