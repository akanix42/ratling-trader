define(function (require) {
    var beforeMoveEvent = require('game/events/beforeMoveEvent'),
        afterMoveEvent = require('game/events/afterMoveEvent'),
        meleeAttackEvent = require('game/events/meleeAttackEvent'),
        moveCommand = require('game/commands/move-command');

    return move;

    function move(mixinFactory) {
        var mixin = mixinFactory.get();
        mixin.addCommand(moveCommand, move);
        return mixin;

        function move(dX, dY) {
            var self = this;
            if (dX instanceof Object) {
                dY = dX.y;
                dX = dX.x;
            }
            dX = Math.floor(dX);
            dY = Math.floor(dY);

            if (dX === 0 && dY === 0)
                return;

            var currentTile = self.getPositionManager().getTile();
            var newTile = self.getPositionManager().getTile().getNeighbor(dX, dY);
            var beforeMoveEvent = beforeMoveEvent(self, newTile);
            self.raiseEvent(beforeMoveEvent);
            if (beforeMoveEvent.blockedBy) {
                //todo ui messages.add message(beforeMoveEvent)
            }
            else {
                newTile.raiseEvent(beforeMoveEvent);
                if (!beforeMoveEvent.blockedBy) {
                    self.getPositionManager().setTile(newTile);
                    var afterMoveEvent = afterMoveEvent(self, currentTile, newTile);
                    self.raiseEvent(afterMoveEvent);
                    newTile.raiseEvent(afterMoveEvent);
                }
                else {
                    self.raiseEvent(meleeAttackEvent(beforeMoveEvent.blockedBy));
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