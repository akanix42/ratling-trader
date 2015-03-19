    require.config({
        shim: {
            "rot": {
                "exports": "ROT"
            },
            "stringformat": {
                "exports": "stringformat"
            }
        },
        paths: {
            "requirejs": "../bower_components/requirejs/require",
            "json": "../bower_components/requirejs-plugins/src/json",
            "text": "../bower_components/text/text",
            "promise": "../bower_components/requirejs-promise/requirejs-promise",
            "rot": "../bower_components/rot.js/rot",
            "injector": "../lib/injector/injector",
            "extend": "../lib/extend/extend",
            "array-extensions": "../lib/array-extensions/array-extensions",
            "lib": "../lib",
            "uuid": "../bower_components/node-uuid/uuid",
            "stringformat": "../bower_components/stringformat.js/index",
            "moment": "../bower_components/moment/moment"
        },
        packages: [
            {
                "name": "when",
                "main": "when.js",
                "location": "../bower_components/when"
            }
        ]
    });