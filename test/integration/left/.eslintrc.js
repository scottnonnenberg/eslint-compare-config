'use strict';

var left = {
  extends: [
    '@scottnonnenberg/thehelp/scripts',
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
