    require.config({
        shim: {
            "rot": {
                "exports": "ROT"
            },
            "stringformat": {
                "exports": "stringformat"
            },
            "knockout.punches": {
                init: function(ko){
                    ko.punches.enableAll();
                }
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
            "uuid": "../bower_components/node-uuid/uuid",
            "stringformat": "../bower_components/stringformat.js/index",
            "moment": "../bower_components/moment/moment",
            "knockout": "../bower_components/knockout/dist/knockout",
            "knockout.punches": "helpers/knockout.punches.shim"
        },
        packages: [
            {
                "name": "when",
                "main": "when.js",
                "location": "../bower_components/when"
            }
        ]
    });