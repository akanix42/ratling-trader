(function(){
    'use strict';
    requirejs.config({
        //baseUrl: '../src'
        baseUrl: '../app',
        deps: ['runner'],
        paths: {
            spec: '../tests/spec',
            runner: '../tests/spec/runner'
        },
        urlArgs: 'now=' + Date.now(),

    });
})();
