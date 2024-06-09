// config-overrides.js
const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.setupMiddlewares = (middlewares, devServer) => {
    // Custom middlewares go here
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    // Example middleware: logging each request
    devServer.app.use((req, res, next) => {
      console.log(`Request URL: ${req.url}`);
      next();
    });

    return middlewares;
  };
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
