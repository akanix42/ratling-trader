define(function (require) {
    var AbstractMixin = require('game/mixins/abstract-mixin');
    var IntentToMove = require('game/intents/intent-to-move');
    var MoveCommand = require('game/commands/move-command');
    var EntityMovedEvent = require('game/events/entity-moved');

    function CellToCellMovement() {
        AbstractMixin.apply(this);

        this.addCommandHandler(MoveCommand);
    }

    CellToCellMovement.prototype = Object.create(AbstractMixin.prototype);

    CellToCellMovement.prototype.execute = function execute(entity, command) {
        var oldTile = entity.tile;
        var newTile = entity.tile.getNeighbor(command.direction);
        var objections = newTile.intentHandlers.notify(new IntentToMove(entity, newTile));
        if (objections.length)
            return false;
        entity.tile = newTile;
        var event = new EntityMovedEvent(entity, oldTile, newTile);
        entity.eventHandlers.notify(event);
        newTile.eventHandlers.notify(event);
    };

    return CellToCellMovement;
});