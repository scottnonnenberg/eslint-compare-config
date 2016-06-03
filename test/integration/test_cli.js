'use strict';

var chai = require('chai');
var expect = chai.expect;

var cli = require('src/cli');


describe('integration/cli', function() {
  var left = 'test/integration/left/.eslintrc.js';
  var right = 'test/integration/right/.eslintrc.js';

  it('throws if only one arg provided', function() {
    expect(function() {
      cli(['node', 'boot.js', left]);
    }).to.throw(Error)
      .that.match(/needs two configuration/);
  });

  it('throws if three args provided', function() {
    expect(function() {
      cli(['node', 'boot.js', left, right, right]);
    }).to.throw(Error)
      .that.match(/needs two configuration/);
  });

  it('shows help', function() {
    cli(['node', 'boot.js', left, right, '--help']);
  });

  it('shows differences between two files', function() {
    cli(['node', 'boot.js', left, right]);
  });

  it('shows literal differences between two files', function() {
    cli(['node', 'boot.js', left, right, '--literal']);
  });

  it('shows json differences', function() {
    cli(['node', 'boot.js', left, right, '--json']);
  });

  it('shows score', function() {
    cli(['node', 'boot.js', left, right, '--score']);
  });
});
