(function () {
    'use strict';
    requirejs.config({
        //baseUrl: '../src'
        baseUrl: '../app',
        //deps: ['../tests/test-bootstrap'],
        paths: {
            spec: '../tests/spec',
            tests: '../tests',
            runner: '../tests/runner'
        },
        urlArgs: location.search.match(/bust=false/) ? '' : 'now=' + Date.now()

    });

    require(['require-config-shared'], function () {
        require(['runner']);
    });
})();
