'use strict';

EntityFactory.$inject=["iocContainer", "entityTemplatesLoader", "gameEntities", "idGenerator", "mixinMapFactory"];
Game.registerSingleton("entityFactory", EntityFactory);

function EntityFactory(iocContainer, entityTemplatesLoader, gameEntities, idGenerator, mixinMapFactory) {
    this._ = {
        entityTemplatesLoader: entityTemplatesLoader,
        gameEntities: gameEntities,
        iocContainer: iocContainer,
        idGenerator: idGenerator,
        mixinMapFactory: mixinMapFactory,
    };
    this._.defaultEntityData = getDefaultEntityData.call(this);
}

EntityFactory.prototype.get = function createEntity(data) {
    data = normalizeData.call(this, data, this._.entityTemplatesLoader.get(data.type));
    var entity = this.iocContainer.get("entity");
    entity.id = this._.idGenerator.getNextId("entity");
    entity.channel = "entity." + id;
//entity.data = data;
    entity.type = data.type;
    entity.space = data.space;
    entity.inventory.entity = this;
    entity.inventory.initFrom(data.items);
    entity._.mixins = mixinMapFactory.create(entity);

    initAttributes(entity, data);
    initMixins(data.mixins, entity.mixins);

    entity.stateMachine.states = data.states;

    entity.calculateFov();

    //var entity = this._private.injector.inject(Entity).init(data, this._private.idGenerator);
    this._.gameEntities.add(entity);
    return entity;
};


function initAttributes(entity, data) {
    if (!data.attributes)
        return;

    var keys = Object.keys(data.attributes);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var attribute = data.attributes[key];
        entity.attributes.set(key, attribute);
    }
}

function initMixins(mixins, mixinMap) {
    if (!mixins)
        return;
    for (var i = 0; i < mixins.length; i++)
        mixinMap.add(mixins[i]);
}

function normalizeData(data, template) {
    return extend({}, this._.defaultEntityData, template, data);
}

function getDefaultEntityData() {
    var data = {
        tile: null,
        space: 'floor'
    };

    return data;
}

