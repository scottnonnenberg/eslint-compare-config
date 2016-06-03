'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var cli = require('src/cli');


describe('integration/cli', function() {
  it('loads two files', function() {
    var left = 'test/integration/left/index.js';
    var right = 'test/integration/right/index.js';

    cli(['node', 'file.js', left, right]);
  });
});
