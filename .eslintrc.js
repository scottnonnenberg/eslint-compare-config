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
    '@scottnonnenberg/thehelp/core',
  ],
};
