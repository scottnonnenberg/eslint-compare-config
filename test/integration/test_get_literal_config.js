'use strict';

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const getConfig = require('src/get_literal_config');


describe('integration/getLiteralConfig', () => {
  it('loads two config files', () => {
    const left = 'test/integration/left/.eslintrc.js';
    const right = 'test/integration/right/.eslintrc.js';

    const actual = {
      left: getConfig(left),
      right: getConfig(right),
    };

    expect(actual).to.have.all.keys('left', 'right');

    expect(_.keys(actual.left.rules)).to.have.length(3);
    expect(_.keys(actual.right.rules)).to.have.length(3);

    expect(actual.left).to.have.property('extends').that.has.length(1, 'left');
    expect(actual.right).to.have.property('extends').that.has.length(1, 'right');

    expect(actual.left).not.to.have.deep.property('plugins', 'left');
    expect(actual.right).to.have.deep.property('plugins').that.has.length(2, 'right');
  });
});
