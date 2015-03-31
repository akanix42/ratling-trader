define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var IntentToMove = require('game/intents/intent-to-move');
    var MoveCommand = require('game/commands/move-command');
    var EntityMovedEvent = require('game/events/entity-moved');

    function CellToCellMovement() {
        AbstractMixin.apply(this);

        this.addCommandHandler(MoveCommand, move);
    }

    CellToCellMovement.prototype = Object.create(AbstractMixin.prototype);
    CellToCellMovement.prototype.move = move;

    function move(command, entity) {
        var oldTile = entity.tile;
        var newTile = entity.tile.getNeighbor(command.direction);
        if (newTile.name === "null") return newTile;

        var objections = newTile.intentHandlers.notify(new IntentToMove(entity, newTile));
        if (objections.length)
            return false;
        entity.tile = newTile;
    }

    return CellToCellMovement;
});