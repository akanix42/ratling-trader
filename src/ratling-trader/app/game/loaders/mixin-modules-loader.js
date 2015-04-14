define(function (require) {
    'use strict';
    var loadModules = require('helpers/module-loader');
    var mixins = require('json!config/mixins.json');
    var when = require('when');

    function LoadedMixins(injector) {
        var deferred = when.defer();
        this.promise = deferred.promise;

        loadModules(mixins, injector).then(function (loader) {
            //injectModules(loader);

            deferred.resolve(loader);
        });


        function injectModules(loader) {
            var modules = loader.getModules();
            var moduleKeys = Object.keys(modules);
            for (var i = 0; i < moduleKeys.length; i++) {
                var key = moduleKeys[i];
                loader.addModuleInstance(key, injector.inject(modules[key]));
            }
        }
    }

    return LoadedMixins;

});

