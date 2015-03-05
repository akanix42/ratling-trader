define(function (require) {
    var loadModules = require('helpers/module-loader'),
        mixins = require('json!config/mixins.json'),
        when = require('when');

    function LoadedMixins(injector) {
        var deferred = when.defer();
        this.promise = deferred.promise;

        loadModules(mixins).then(function (loader) {
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

    return LoadedMixins;

});

