define(function (require) {
    var TileEntities = require('game/tiles/tile-entities');

    function Tile(tileData, intentHandlers, eventHandlers, entityFactory) {
        var self = this;
        self._private = {
            baseArchitecture: tileData.baseArchitecture,
            entities: new TileEntities(),
            level: tileData.level,
            position: tileData.position,

            intentHandlers: intentHandlers,
            eventHandlers: eventHandlers
        };
        addEntities();

        function addEntities() {
            var _ = self._private;
            _.entities.add(entityFactory.create({type: tileData.baseArchitecture, tile: self}));
            if (!tileData.entities) return;
            for (var i = 0; i < tileData.entities.length; i++) {
                var entityData = tileData.entities[i];
                entityData.tile = self;
                _.entities.add(entityFactory.create(entityData));
            }
        }
    }

    Tile.prototype = {
        get entities() {
            return this._private.entities;
        },
        get intentHandlers() {
            return this._private.intentHandlers;
        },
        get eventHandlers() {
            return this._private.eventHandlers;
        },
        get level() {
            return this._private.level;
        },
        get position() {
            return this._private.position;
        },
        getNeighbor: function getNeighbor(direction) {
            return this.level.getTileAt(this.position.x + (direction.x || 0), this.position.y + (direction.y || 0));
        },

    };


    return Tile;

});