"use strict";

(function () {
  "use strict";
  requirejs.config({
    //baseUrl: '../src'
    baseUrl: "../app",
    deps: ["runner"],
    paths: {
      spec: "../tests/spec",
      runner: "../tests/runner"
    },
    urlArgs: "now=" + Date.now()

  });
})();