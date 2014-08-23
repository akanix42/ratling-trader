define(function (require) {
    var extend = require('lib/extend/extend'),
        Entity = require('game/entities/entity');


    return EntityFactory;

    function EntityFactory(logger, entityTemplatesLoader, loadedBehaviors, loadedMixins, entityAttributesFactory, entityPositionFactory) {
        var self = this;

        self.get = get;

        function get(data) {
            if (typeof data === 'string')
                data = {type: data};

            data = extend(true, getDefaultData(), entityTemplatesLoader.get(data.type), data);
            var entity = new Entity(data, entityAttributesFactory.get(), entityPositionFactory, loadedMixins, loadedBehaviors, logger);
            return entity;
        }

        function getDefaultData() {
            return {
                attributes: {},
                mixins: {},
                initialState: 'default',
                states: {'default': {behaviors: []}}
            };
        }

    }
});