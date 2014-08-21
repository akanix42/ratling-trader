define(function (require) {
    var behaviors = {};

    return {
        get: function (name) {
            return behaviors[name];
        },
        add: function (name, behavior) {
            behaviors[name] = behavior;
        }
    };
});

