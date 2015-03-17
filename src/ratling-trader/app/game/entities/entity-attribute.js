define(function (require) {
    var extend = require('extend');

    function EntityAttribute(data) {
        this._private = extend({}, getDefaultData(), normalizeData(data));
        this._private.modifiers = new AttributeModifiers(this);
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
            return this._private.base;
        },
        set base(value) {
            value = Math.min(value, this.max);
            this._private.base = value;
        },
        get bonus() {
            return this._private.bonus;
        },
        get current() {
            return this.base + this.bonus;
        },
        get max() {
            return this._private.max;
        },
        set max(value) {
            this._private.max = value;
        },
        get modifiers() {
            return this._private.modifiers;
        }
    };

    function AttributeModifiers(attribute) {
        this._private = {
            attribute: attribute,
            modifiers: new Map()
        };
        var initialModifiers =attribute._private.modifiers;
        if (initialModifiers)
        for (var i = 0; i < initialModifiers.length; i++)
            this.set(initialModifiers[i])
    }

    AttributeModifiers.prototype.set = function set(modifier) {
        var oldModifier = this._private.modifiers.get(modifier.name);
        this._private.modifiers.set(modifier.name, modifier);
        var value = modifier.value;
        if (oldModifier)
            value = value - oldModifier.value;
        this._private.attribute._private.bonus += value;
    }

    return EntityAttribute;
});