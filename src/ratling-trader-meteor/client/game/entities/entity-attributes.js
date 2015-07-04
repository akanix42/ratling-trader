"use strict";
EntityAttributes.$inject = ['entityAttributeFactory'];
Game.registerUnique("entityAttributes", EntityAttributes);

function EntityAttributes(entityAttributeFactory) {
    this.attributes = {};
    this.entityAttributeFactory = entityAttributeFactory;
}

EntityAttributes.prototype = {
    emptyAttribute: {
        base: 0,
        bonus: 0,
        current: 0
    },
    get: function get(attributeName) {
        return this.attributes[attributeName] || null;
    },
    set: function set(attributeName, attributeData) {
        this.attributes[attributeName] = this.entityAttributeFactory.get(attributeData);
    }
};
