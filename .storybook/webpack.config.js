const Dotenv = require('dotenv-webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.plugins.push(new Dotenv({ path: './.env.local', safe: true }));
  return defaultConfig;
};
