define(function (require) {
    var architectures = require('json!config/architectures.json'),
        monsters = require('json!config/monsters.json');

    return EntityTemplatesLoader;

    function EntityTemplatesLoader(logger) {
        var templates = {};

        logger.group(EntityTemplatesLoader.name);
        logger.logInfo('loading entities');

        loadArchitectures();
        loadCreatures();

        logger.logInfo('loaded entities');
        logger.groupEnd();

        return {
            getAll: getAll,
            get: get
        };

        function loadArchitectures() {
            for (var i = 0; i < architectures.length; i++) {
                addArchitecture(architectures[i]);
            }
        }

        function addArchitecture(template) {
            template.type = 'architecture';
            addEntityTemplate(template);
        }

        function addEntityTemplate(template) {
            templates[template.name] = template;
        }

        function loadCreatures() {
            for (var i = 0; i < monsters.length; i++)
                addEntityTemplate(monsters[i]);
        }

        function getAll() {
            return templates;
        }

        function get(name) {
            return templates[name];
        }

    }
});

