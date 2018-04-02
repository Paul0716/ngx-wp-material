const PROXY_CONFIG = {
  "/Eip": {
    "target": "http://139.162.108.134:8080",
    "secure": false,
    "logLevel": "debug",
    "bypass": function (req, res, proxyOptions) {
      console.log(`==== request ==== `);
      console.log(req.method);
      console.log(req.headers);
      console.log(`==== response ==== `);
      console.log(res.method);
      console.log(res.headers);
      console.log(`==== end ====`);
      return res;
    }
  }
}
module.exports = PROXY_CONFIG;
