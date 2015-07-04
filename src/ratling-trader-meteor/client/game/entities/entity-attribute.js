"use strict";
EntityAttribute.typeName = "entityAttribute";
JSONC.register(EntityAttribute);

function EntityAttribute(data) {
    this._ = extend({}, getDefaultData(), normalizeData(data));
    this._.modifiers = new AttributeModifiers(this);
}

function getDefaultData() {
    return {
        base: 0,
        max: 0,
        bonus: 0
    }
}

function normalizeData(data) {
    if (!data) return;
    if (data.max === undefined)
        data.max = data.base;
    return data;
}

EntityAttribute.prototype = {
    get base() {
        return this._.base;
    },
    set base(value) {
        value = Math.min(value, this.max);
        this._.base = value;
    },
    get bonus() {
        return this._.bonus;
    },
    get current() {
        return this.base + this.bonus;
    },
    get max() {
        return this._.max;
    },
    set max(value) {
        this._.max = value;
    },
    get modifiers() {
        return this._.modifiers;
    },
    //
    //toDto: function toDto() {
    //    var _ = this._private;
    //    return {
    //        base: _.base,
    //        bonus: _.bonus,
    //        max: _.max,
    //        modifiers: _.modifiers.toDto()
    //    }
    //}
};

function AttributeModifiers(attribute) {
    this._ = {
        attribute: attribute,
        modifiers: {}
    };
    var initialModifiers = attribute._.modifiers;
    if (initialModifiers)
        for (var i = 0; i < initialModifiers.length; i++)
            this.set(initialModifiers[i])
}

AttributeModifiers.prototype.set = function set(modifier) {
    var oldModifier = this._.modifiers[modifier.name];
    this._.modifiers[modifier.name] = modifier;
    var value = modifier.value;
    if (oldModifier)
        value = value - oldModifier.value;
    this._.attribute._.bonus += value;
};

Game.registerSingleton("entityAttributeFactory", EntityAttributeFactory);
function EntityAttributeFactory() {

}

EntityAttributeFactory.prototype.get = function get(attributeData) {
    return new EntityAttribute(attributeData);
};
