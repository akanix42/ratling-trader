define(function (require) {
    var extend = require('lib/extend/extend'),
        truthy = require('lib/truthy-falsy/truthy');
    return Injector;

    function Injector() {
        var self = this;
        this.fixDependencyCasing = allUpperCase;

        function resolve(name, dependencyAbove, dependencyTree) {
            var originalName = name;
            name = self.fixDependencyCasing(name);
            if (!(name in self.dependencies)) {
                debugger;
                throw originalName + ' not registered';
            }
            if (truthy(dependencyAbove) && name in dependencyTree)
                throw dependencyAbove + ' has a circular dependency on ' + name;
            dependencyTree = extend({}, dependencyTree);
            dependencyTree[name] = '';

            return self.dependencies[name].initializer.initialize(dependencyTree);
        }

        var injector = {

            dependencies: {},

            getDependencies: function (name, dependencies, dependencyTree) {
                return dependencies.length === 1 && dependencies[0] === '' ? []
                    : dependencies.map(function (value) {
                        return resolve(value, name, dependencyTree);
                    }
                );
            },

            register: function (name, item, isSingleton) {
                self.dependencies[self.fixDependencyCasing(name)] = {item: item, initializer: new Initializer(self, name, item, isSingleton)};
            },

            resolve: function (name) {
                return resolve(name, undefined, {});
            }

        };
        extend(self, injector);

        function allUpperCase(name) {
            return name.toUpperCase();
        }

        function firstLetterUpperCase(value) {
            return value[0].toUpperCase() + value.substring(1);
        }
    }

    function Initializer(injector, name, item, isSingleton) {
        var self = this;
        createInitializationSteps();

        function createInitializationSteps() {
            if (isFunction(item))
                createFunctionInitializationSteps();
            else
                createObjectInitializationSteps();
        }

        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        function createFunctionInitializationSteps() {
            var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
            var text = item.toString();
            var dependencies = text.match(FN_ARGS)[1].split(',');
            dependencies = dependencies.map(function (dependency) {
                return dependency.replace(/\s+/g, '');
            });

            self.initialize = function (dependencyTree) {
                var initializedItem = construct(item, injector.getDependencies(name, dependencies, dependencyTree));
                if (isSingleton) {
                    item = initializedItem;
                    createObjectInitializationSteps();
                }

                return initializedItem;
            };
        }

        function construct(constructor, args) {
            function F() {
                return constructor.apply(this, args);
            }

            F.prototype = constructor.prototype;
            return new F();
        }

        function createObjectInitializationSteps() {
            self.initialize = function () {
                return item;
            };
        }
    }

});