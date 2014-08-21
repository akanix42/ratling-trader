require.config({
    baseUrl: 'app',
    shim: {
        'rot': {
            exports: 'ROT'
        },
        'stringformat': {
            exports: 'stringformat'
        }
    },
    paths: {
        requirejs: '../bower_components/requirejs/require',
        rot: '../bower_components/rot.js/rot',
        injector: '../lib/injector/injector',
        extend: '../lib/extend/extend',
        lib: '../lib',
        uuid: '../bower_components/node-uuid/uuid',
        stringformat: '../bower_components/stringformat.js/index',
        moment: '../bower_components/moment/moment',

    },
    packages: [
        {
            name: 'when',
            main: 'when.js',
            location: '../bower_components/when'
        }
    ]
});
