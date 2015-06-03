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
        },
        toDto: function toDto() {
            var dto = {};
            for (var attribute of this._private.attributes)
                dto[attribute[0]] = attribute[1].toDto();
            return dto;
        }
    };
    return EntityAttributes;
});