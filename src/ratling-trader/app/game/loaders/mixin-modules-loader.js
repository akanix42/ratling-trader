define(function (require) {
    var loadModules = require('helpers/module-loader'),
        mixins = require('json!config/mixins.json');

    function LoadedMixins(injector){
        var loader = loadModules(mixins);

        injectModules(loader);

        return loader;

        function injectModules(loader) {
            debugger;
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

