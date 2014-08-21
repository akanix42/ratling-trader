define(function (require) {
    var extend = require('lib/extend/extend'),
        Mixins = require('game/mixins'),
        Behaviors = require('game/behaviors'),
        Entity = require('game/entities/entity');


    return EntityFactory;

    function EntityFactory(logger, entityTypes) {
        var self = this;

        self.get = get;

        function get(data) {
            if (typeof data === 'string')
                data = {type: data};

            data = extend(true, getDefaultData(), entityTypes.get(data.type), data);
            var entity = new Entity(data, Mixins, Behaviors, logger);
            return entity;
        }

        function getDefaultData() {
            return {
                position: {x: 0, y: 0},
                mixins: {},
                initialState: 'default',
                states: {'default': {behaviors: []}}
            };
        }

    }
});