const PROXY_CONFIG = {
  "/wp-json": {
    "target": "http://wpdev.paultaku.tw",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
}
module.exports = PROXY_CONFIG;
