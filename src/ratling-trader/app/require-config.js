require.config({
    baseUrl: 'app',
    shim: {
        'rot': {
            exports: 'ROT'
        }
    },
    paths: {
        requirejs: '../bower_components/requirejs/require',
        rot: '../bower_components/rot.js/rot',
        injector: '../lib/injector/injector',
        lib: '../lib',
    },
    packages: [
        {
            name: 'when',
            main: 'when.js',
            location: '../bower_components/when'
        }
    ]
});
