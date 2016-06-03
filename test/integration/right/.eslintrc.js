'use strict';

var right = {
  extends: [
    'thehelp/test',
  ],

  plugins: [
    'thehelp',
    'immutable',
    'react',
  ],

  rules: {
    two: 'off',
    three: ['error', {
      setting: 2,
    }],
    four: 'error',
  },
};

module.exports = right;
