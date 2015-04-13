define(function (require) {
    'use strict';
    var loadModules = require('helpers/module-loader');
    var behaviors = require('json!config/behaviors.json');
    var when = require('when');

    function LoadedBehaviors(injector) {
        var deferred = when.defer();
        this.promise = deferred.promise;

        loadModules(behaviors).then(function (loader) {
            injectModules(loader);

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

    return LoadedBehaviors;
});

