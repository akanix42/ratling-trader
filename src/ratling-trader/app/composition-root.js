define(function (require) {
    var when = require('when');
    var extend = require('extend');
    var Injector = require('injector');

    function CompositionRoot() {
        this._private = {
            injector: new Injector(),
        };
        this._private.injector.register('injector', this._private.injector, true);
    }

    CompositionRoot.prototype = {
        get injector() {
            return this._private.injector;
        }
    };

    CompositionRoot.prototype.registerObject = function registerObject(name, object) {
        return this.registerModule(null, {isSingleton: true, fn: object, name: name});
    };

    CompositionRoot.prototype.registerModule = function registerModule(path, options) {
        var self = this;
        var defaultOptions = {name: null, fn: null, isSingleton: false};
        options = extend({}, defaultOptions, options);

        return when(loadModule())
            .then(function (loadedModule) {
                if (!options.name)
                    options.name = loadedModule.name;

                self._private.injector.register(options.name, loadedModule, options.isSingleton);
            });


        function loadModule() {
            var deferred = when.defer();
            var fn = options.fn;
            if (!fn)
                require([path], function (fn) {
                    deferred.resolve(fn);
                });
            else deferred.resolve(fn);

            return deferred.promise;
        }

    };

    return CompositionRoot;
});