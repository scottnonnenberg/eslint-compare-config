'use strict';

const right = {
  extends: ['@scottnonnenberg/thehelp/test'],

  plugins: [
    'immutable',
    'react',
  ],

  rules: {
    two: 'off',
    three: ['error', { setting: 2 }],
    four: 'error',
  },
};

module.exports = right;
