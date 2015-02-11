define(function (require) {

    function TileEntities() {
        this._private = {
            entities: []
        };
    }

    TileEntities.prototype.add = function add(entity) {
        this._private.entities.push(entity);
    };

    TileEntities.prototype.all = function all() {
        return this._private.entities.slice();
    };

    function Tile(tileData, intentHandlers, entityFactory) {
        this._private = {
            baseArchitecture: tileData.baseArchitecture,
            entities: new TileEntities(),
            level: tileData.level,
            position: tileData.position,

            intentHandlers: intentHandlers
        };
        this.entities.add(entityFactory.create({type:tileData.baseArchitecture, tile: this}));
    }

    Tile.prototype = {
        get entities() {
            return this._private.entities;
        },
        get intentHandlers() {
            return this._private.intentHandlers;
        },
        get level() {
            return this._private.level;
        },
        get position() {
            return this._private.position;
        },
        getNeighbor: function getNeighbor(direction) {
            return this.level.getTileAt(this.position.x + direction.x, this.position.y + direction.y);
        },

    };


    return Tile;

});