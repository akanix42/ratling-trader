define(function (require) {
    var extend = require('lib/extend/extend'),
        position = require('game/entities/entity-position');

    return entityPositionFactory;

    function entityPositionFactory() {
        return {get: get};

        function get(entity, level, tile) {
            return position(entity, level, tile);
        }
    }

});