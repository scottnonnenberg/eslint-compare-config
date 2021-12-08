'use strict';

module.exports = {
  settings: { 'import/resolver': { node: { paths: [__dirname] } } },

  extends: ['@scottnonnenberg/thehelp'],

  rules: {
    'filenames/match-exported': 'off',
    'import/no-internal-modules': 'off',
  },

};
