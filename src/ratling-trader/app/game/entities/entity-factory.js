define(function (require) {
    var //Player = require('game/entities/mixins'),
        extend = require('lib/extend/extend'),
        //        Entities = require('enums/entity-type'),
        Mixins = require('game/mixins'),
        Entity = require('game/entities/entity');


    return EntityFactory;

    function EntityFactory(logger, entityTypes) {
        var self = this;

        self.get = get;

        function get(data) {
            if (typeof data === 'string')
                data = {type: data};

//            var entityType= entityTypes.get(data.type);
//
//            if (entityType.type === 'architecture') {
//                if (!entityTypes.get(data.type).getType)
//                    entityTypes.get(data.type).getType = function () {return data.type;}
//                return Object.create(extend(true, {}, entityTypes.get(data.type)));
//            }
            data = extend(true, getDefaultData(), entityTypes.get(data.type), data);
            var entity = new Entity(data, Mixins, logger);
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