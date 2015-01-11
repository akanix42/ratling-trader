define(function (require) {
    var loadModules = require('helpers/module-loader'),
        behaviors = require('json!config/behaviors.json');

    return loadModules(behaviors);

});

