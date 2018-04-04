const PROXY_CONFIG = {
  "/wp-json": {
    "target": "http://wpdev.paultaku.tw",
    "secure": false,
    "logLevel": "debug",
    "bypass": function (req, res, proxyOptions) {
      console.log(`==== request ==== `);
      console.log(req.originalUrl);
      console.log(req.method);
      console.log(req.headers);
      console.log(`==== end ====`);
      return res;
    }
  }
}
module.exports = PROXY_CONFIG;
