define(function (require) {
    var extend = require('lib/extend/extend'),
        Entity = require('game/entities/entity');


    return EntityFactory;

    function EntityFactory(logger, entityTemplatesLoader, behaviors, mixins) {
        var self = this;

        self.get = get;

        function get(data) {
            if (typeof data === 'string')
                data = {type: data};

            data = extend(true, getDefaultData(), entityTemplatesLoader.get(data.type), data);
            var entity = new Entity(data, mixins, behaviors, logger);
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