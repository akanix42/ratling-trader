define(function () {

    function EntityAttributes() {
        this._private = {
            attributes: new Map(),
        };
    }

    EntityAttributes.prototype = {
        emptyAttribute: {
            base: 0,
            bonus: 0,
            current: 0
        },
        get: function get(attributeName) {
            return this._private.attributes.get(attributeName) || this.emptyAttribute;
        },
        set: function set(attributeName, value) {
            this._private.attributes.set(attributeName, value);
        }
    };
    return EntityAttributes;
});