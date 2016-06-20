'use strict';

/* eslint-disable global-require */

module.exports = {
  getConfigSync: require('./src/get_config'),
  getDifferencesSync: require('./src/get_differences'),
  getLiteralConfigSync: require('./src/get_literal_config'),
  getScoreSync: require('./src/get_score'),
  normalizeConfigSync: require('./src/normalize_config'),
  renderDifferencesSync: require('./src/render_differences'),
};
