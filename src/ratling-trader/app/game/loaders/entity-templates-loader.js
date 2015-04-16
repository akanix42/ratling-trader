define(function (require) {
    var architectures = require('json!config/architectures.json'),
        items = require('json!config/items.json'),
        monsters = require('json!config/monsters.json'),
        spells = require('json!config/spells.json'),
        extend = require('extend');

    return EntityTemplatesLoader;

    function EntityTemplatesLoader(loadedBehaviors) {
        var templates = {};
        var logger = rat.logger;
        logger.group(EntityTemplatesLoader.name);
        logger.info('loading entities');

        loadArchitectures();
        loadCreatures();
        loadItems();
        loadSpells();

        logger.info('loaded entities');
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
            var defaultData = {
                type: 'architecture',
                isWalkable: false,
                space: 'architecture',
                passesLight: true
            };

            addEntityTemplate(extend({}, defaultData, template));
        }

        function addEntityTemplate(template) {
            var defaultData = {
                "health": {
                    "base": 10
                },
                space: 'air'
            };

            processStates(template);


            templates[template.name] = extend({}, defaultData, template);
        }

        function processStates(template) {
            if (!template.states)
                return;
            var statesList = Object.keys(template.states);
            for (var i = 0; i < statesList.length; i++) {
                var state = template.states[statesList[i]];
                state.behavior = loadedBehaviors.get(state.name);
            }
        }

        function loadCreatures() {
            for (var i = 0; i < monsters.length; i++)
                addEntityTemplate(monsters[i]);
        }

        function loadItems() {
            var defaultData = {
                type: 'item',
                space: 'floor'
            };
            for (var i = 0; i < items.length; i++)
                addEntityTemplate(extend({}, defaultData, items[i]));
        }

        function loadSpells() {
            for (var i = 0; i < spells.length; i++)
                addEntityTemplate(spells[i]);
        }

        function getAll() {
            return templates;
        }

        function get(name) {
            return templates[name];
        }

    }
});

