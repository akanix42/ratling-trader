define(function (require) {

    function TileEntities() {
        this._private = {
            entities: []
        };
    }

    TileEntities.prototype.add = function add(entity) {
        this._private.entities.push(entity);
    };

    TileEntities.prototype.all = function all(){
      return this._private.entities.slice();
    };

    function Tile(level, position, intentHandlers, baseArchitecture) {
        this._private = {
            baseArchitecture: baseArchitecture,
            entities: new TileEntities(),
            level: level,
            position: position,

            intentHandlers: intentHandlers
        };
        this.entities.add(baseArchitecture);
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