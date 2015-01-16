define(function (require) {

    function Tile(position) {
        this._private = {
            position: position
        };
    }

    Tile.prototype = {
        get position() {
            return this._private.position;
        }
    };

    return Tile;

});