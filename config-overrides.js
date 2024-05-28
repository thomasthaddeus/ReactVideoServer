// config-overrides.js
const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.setupMiddlewares = (middlewares, devServer) => {
    // Custom middlewares go here

    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    return middlewares;
  };
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
