define(function (require) {
    var MoveEvent = require('game/events/after-move-event'),
        AttackCommand = require('game/commands/attack-command'),
        MoveIntent = require('game/intents/move-intent'),
        MoveCommand = require('game/commands/move-command');

    return move;

    function move(mixinFactory, tileFactory) {
        var mixin = mixinFactory.get();
        mixin.addCommand(MoveCommand, move);
        return mixin;

        function move(moveCommand) {
            var self = this;
            var dX = Math.floor(moveCommand.direction.x);
            var dY = Math.floor(moveCommand.direction.y);

            if (dX === 0 && dY === 0)
                return;

            var currentTile = self.getPositionManager().getTile();
            var newTile = self.getPositionManager().getTile().getNeighbor(dX, dY);
            if (newTile === tileFactory.getNull())
                return;
            var moveIntent = MoveIntent(self, newTile);
            var objections = self.intentHub.broadcast(moveIntent);
            if (objections.length) {
                //todo ui messages.add message(beforeMoveEvent)
            }
            else {
                objections = newTile.intentHub.broadcast(moveIntent);
                if (!objections.length) {
                    self.getPositionManager().setTile(newTile);
                    var afterMove = MoveEvent(self, currentTile, newTile);
                    self.eventHub.broadcast(afterMove);
                    newTile.eventHub.broadcast(afterMove);
                }
                else {
                    self.eventHub.broadcast(AttackCommand(self, objections[0]));
                }
            }
            //if (attack())
            //    return;
            //
            //if (newTile.getCreature())
            //    self.eventHub.broadcast('attack')
            //else if (newTile.isWalkable())
            //    self.getPositionManager().setTile(newTile);
            //else if (newTile.isDiggable())
            //    newTile.dig();
            //else
            //    return false;
            //
            //
            //function attack() {
            //    if (newTile.getCreature())
            //        return self.eventHub.broadcast('attack', newTile.getCreature());
            //    return false;
            //}
        }
    }
});