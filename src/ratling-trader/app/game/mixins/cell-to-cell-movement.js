define(function (require) {
    var IntentToMove = require('game/intents/intent-to-move');

    function CellToCellMovement() {

    }

    CellToCellMovement.prototype.execute = function execute(entity, command) {
        var newTile = entity.tile.getNeighbor(command.direction);
        var objections = newTile.intentHandlers.notify(new IntentToMove(entity, newTile));
        if (objections.length)
            return false;
        entity.tile = newTile;
    };

    return CellToCellMovement;
});