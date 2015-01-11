define(function (require) {
    return entityAttributes;

    function entityAttributes(attributeFactory) {
        var attributes = {};

        return {
            setAttributes: setAttributes,
            get: get
        };

        function setAttributes(rawAttributes) {
            var keys = Object.keys(rawAttributes);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                attributes[key] = attributeFactory.get(rawAttributes[key]);
            }
        }

        function get(name) {
            return attributes[name];
        }
    }

});