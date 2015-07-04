"use strict";

function EntityTemplates(templates) {
    this.templates = templates;
}
EntityTemplates.prototype.get = get;
EntityTemplates.prototype.getAll = getAll;

function getAll() {
    return this.templates;
}

function get(name) {
    return this.templates[name];
}

Game.dataLoaders.EntityTemplatesLoader = EntityTemplatesLoader;

function EntityTemplatesLoader(loadedBehaviors) {
    this.loadedBehaviors = loadedBehaviors;
}
EntityTemplatesLoader.prototype.load = function(){
    var templates = {};

    return DataLoader.loadEach({
        architectures: "config/architectures.json",
        items: "config/items.json",
        monsters: "config/monsters.json",
        spells: "config/spells.json"
    }).then(function(data){
        var logger = rat.logger;
        logger.group(EntityTemplatesLoader.name);
        logger.info('loading entities');

        loadArchitectures(data.architectures);
        loadCreatures(data.monsters);
        loadItems(data.items);
        loadSpells(data.spells);

        logger.info('loaded entities');
        logger.groupEnd();

        return new EntityTemplates(templates);
    });

    function loadArchitectures(architectures) {
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

    function loadCreatures(monsters) {
        for (var i = 0; i < monsters.length; i++)
            addEntityTemplate(monsters[i]);
    }

    function loadItems(items) {
        var defaultData = {
            type: 'item',
            space: 'floor'
        };
        for (var i = 0; i < items.length; i++)
            addEntityTemplate(extend({}, defaultData, items[i]));
    }

    function loadSpells(spells) {
        for (var i = 0; i < spells.length; i++)
            addEntityTemplate(spells[i]);
    }

};