define(function (require) {
    var when = require('when'),
        behaviors = require('json!config/behaviors.json');
    var deferred = when.defer(),
        behaviorModules = [];

    var behaviorKeys = Object.keys(behaviors);
    var behaviorPaths = getBehaviorPathsArray();
    loadBehaviors(behaviorKeys, behaviorPaths);

    return deferred.promise;

    function getBehaviorPathsArray() {
        var behaviorPaths = [];
        for (var i = 0; i < behaviorKeys.length; i++)
            behaviorPaths.push(behaviors[behaviorKeys[i]]);
        return behaviorPaths;
    }

    function loadBehaviors(behaviorKeys, behaviorPaths) {
        require(behaviorPaths, function () {
            for (var i = 0; i < behaviorPaths.length; i++)
                behaviorModules[behaviorKeys[i]] = arguments[i];

            deferred.resolve({getAll: getAll, get: get });
        });
    }

    function getAll() {
        return behaviorModules;
    }

    function get(name) {
        return behaviorModules[name];
    }
});

