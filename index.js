'use strict';

/* eslint-disable global-require */

module.exports = {
  getConfig: require('./src/get_config'),
  getDifferences: require('./src/get_differences'),
  getLiteralConfig: require('./src/get_literal_config'),
  getScore: require('./src/get_score'),
  renderDifferences: require('./src/render_differences'),
};
