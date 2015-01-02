define(function (require) {
    var when = require('when');

    return load;

    function load(modulesToLoad) {
        var deferred = when.defer(),
            modules = [],
            instances = [];


        var keys = Object.keys(modulesToLoad);
        var paths = getPathsArray();
        var _public = {
            getModules: getModules,
            get: get,
            addModuleInstance: addModuleInstance
        };
        loadModules();

        return deferred.promise;

        function getPathsArray() {
            var paths = [];
            for (var i = 0; i < keys.length; i++)
                paths.push(modulesToLoad[keys[i]]);
            return paths;
        }

        function loadModules() {
            require(paths, function () {
                for (var i = 0; i < paths.length; i++)
                    modules[keys[i]] = arguments[i];

                deferred.resolve(_public);
            });
        }

        function getModules() {
            return modules;
        }

        function get(name) {
            return instances[name];
        }

        function addModuleInstance(name, instance) {
            instances[name] = instance;
        }
    }

});

