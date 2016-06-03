'use strict';

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
  },

  extends: [
    'thehelp/core',
  ],

  rules: {
    'no-magic-numbers': 'off', // requires const!
  },
};
