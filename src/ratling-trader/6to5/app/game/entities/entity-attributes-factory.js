define(function (require) {
    var entityAttributes = require('game/entities/entity-attributes');
    return entityAttributesFactory;

    function entityAttributesFactory(attributeFactory) {
        return {
            get: get
        };

        function get() {
            return entityAttributes(attributeFactory);
        }
    }

});