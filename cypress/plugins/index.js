/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = (on, config) => {
  require('cypress-grep/src/plugin')(config);
};
