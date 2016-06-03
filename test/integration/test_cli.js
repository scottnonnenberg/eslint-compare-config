'use strict';

var cli = require('src/cli');


describe('integration/cli', function() {
  var left = 'test/integration/left/.eslintrc.js';
  var right = 'test/integration/right/.eslintrc.js';

  it('shows help', function() {
    cli(['node', 'file.js', left, right, '--help']);
  });

  it('shows differences between two files', function() {
    cli(['node', 'file.js', left, right]);
  });

  it('shows literal differences between two files', function() {
    cli(['node', 'file.js', left, right, '--literal']);
  });

  it('shows json differences', function() {
    cli(['node', 'file.js', left, right, '--json']);
  });

  it('shows score', function() {
    cli(['node', 'file.js', left, right, '--score']);
  });
});
