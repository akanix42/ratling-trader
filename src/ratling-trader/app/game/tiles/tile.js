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
            tileData.tile = self;
            _.entities.add(entityFactory.create(tileData.baseArchitecture));
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
        getNeighbors: function getNeighbors(distance) {
            var x = this.position.x;
            var y = this.position.y;
            var tiles = [];
            for (var i = 1; i <= distance; i++)
                getTilesAtDistance(i, x, y, this.level, tiles);

            return tiles;
        },
    };

    function getTilesAtDistance(distance, sourceX, sourceY, level, tiles) {
        var startingX = sourceX - distance;
        var startingY = sourceY - distance;
        var endingX = sourceX + distance;
        var endingY = sourceY + distance;

        var minX = Math.max(startingX, 0);
        var minY = Math.max(startingY, 0);
        var maxX = Math.min(endingX, level.size.width);
        var maxY = Math.min(endingY, level.size.height);
        for (var x = minX; x < maxX; x++) {
            if (x === startingX || x === endingX)
                for (var y = minY; y < maxY; y++)
                    tiles.push(level.getTileAt(x, y));
            else {
                if (minY === startingY)
                    tiles.push(level.getTileAt(x, startingY));
                if (maxY === endingY)
                    tiles.push(level.getTileAt(x, endingY));
            }
        }
    }

    return Tile;

});