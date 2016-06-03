'use strict';

var left = {
  extends: [
    'thehelp/scripts',
  ],

  plugins: [
    'thehelp',
  ],

  rules: {
    one: 'error',
    two: 'off',
    three: ['error', {
      setting: 1,
    }],
  },
};

module.exports = left;
