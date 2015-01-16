(function(){
    'use strict';
    requirejs.config({
        //baseUrl: '../src'
        baseUrl: '../app',
        deps: ['runner'],
        paths: {
            spec: '../tests/spec',
            tests: '../tests',
            runner: '../tests/runner'
        },
        urlArgs: 'now=' + Date.now()

    });
})();
