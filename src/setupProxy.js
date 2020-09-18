const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/rest-service',
      createProxyMiddleware({
        target: process.env.REST_API_URL,
        changeOrigin: true,
      })
    );
  };