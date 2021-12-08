'use strict';

const chai = require('chai');
const expect = chai.expect;

const cli = require('src/cli');


describe('integration/cli', () => {
  const left = 'test/integration/left/.eslintrc.js';
  const right = 'test/integration/right/.eslintrc.js';

  it('throws if only one arg provided', () => {
    expect(() => {
      cli(['node', 'boot.js', left]);
    }).to.throw(Error)
      .that.match(/needs two configuration/);
  });

  it('throws if three args provided', () => {
    expect(() => {
      cli(['node', 'boot.js', left, right, right]);
    }).to.throw(Error)
      .that.match(/needs two configuration/);
  });

  it('shows help', () => {
    cli(['node', 'boot.js', left, right, '--help']);
  });

  it('shows differences between two files', () => {
    cli(['node', 'boot.js', left, right]);
  });

  it('shows literal differences between two files', () => {
    cli(['node', 'boot.js', left, right, '--literal']);
  });

  it('shows json differences', () => {
    cli(['node', 'boot.js', left, right, '--json']);
  });

  it('shows score', () => {
    cli(['node', 'boot.js', left, right, '--score']);
  });

  it('shows literal score', () => {
    cli(['node', 'boot.js', left, right, '--score', '--literal']);
  });
});
