define(function (require) {
    var afterMoveEvent = require('game/events/after-move-event'),
        attackCommand = require('game/commands/attack-command'),
        beforeMoveEvent = require('game/events/before-move-event'),
        moveCommand = require('game/commands/move-command');

    return move;

    function move(mixinFactory) {
        var mixin = mixinFactory.get();
        mixin.addCommand(moveCommand, move);
        return mixin;

        function move(moveCommand) {
            var self = this;
            var dX = Math.floor(moveCommand.direction.x);
            var dY = Math.floor(moveCommand.direction.y);

            if (dX === 0 && dY === 0)
                return;

            var currentTile = self.getPositionManager().getTile();
            var newTile = self.getPositionManager().getTile().getNeighbor(dX, dY);
            var beforeMove = beforeMoveEvent(self, newTile);
            self.raiseEvent(beforeMove);
            if (beforeMove.blockedBy) {
                //todo ui messages.add message(beforeMoveEvent)
            }
            else {
               // todo newTile.raiseEvent(beforeMove);
                if (!beforeMove.blockedBy) {
                    self.getPositionManager().setTile(newTile);
                    var afterMove = afterMoveEvent(self, currentTile, newTile);
                    self.raiseEvent(afterMove);
                   //todo newTile.raiseEvent(afterMove);
                }
                else {
                    self.raiseEvent(attackCommand(self, beforeMove.blockedBy));
                }
            }
            //if (attack())
            //    return;
            //
            //if (newTile.getCreature())
            //    self.raiseEvent('attack')
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
            //        return self.raiseEvent('attack', newTile.getCreature());
            //    return false;
            //}
        }
    }
});