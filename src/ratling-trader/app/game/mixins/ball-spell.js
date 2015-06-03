define(function (require) {
    'use strict';
    var MoveCommand = require('game/commands/move-command');

    function BallSpell(game, entityFactory) {
        this._ = {
            entityFactory: entityFactory,
        };
    }

    BallSpell.prototype.applyTo = function init(entity) {
        entity.act = act.bind(entity, this);
        //entity.data.target =
        
        AbstractMixin.prototype.applyTo.call(this, entity);
    };

    BallSpell.prototype.act = function act(spellEntity) {
        if (spellEntity.data.target === spellCast.tile) {
            this.explode(spellCast);
            return true;
        }
        move(spellCast);
    };

    BallSpell.prototype.explode = function explode(spellCast) {
        var neighboringTiles = spellCast.tile.getNeighbors(1);
        for (var i = 0; i < neighboringTiles.length; i++)
            this._.entityFactory.create({
                type: 'explosion', tile: neighboringTiles[i], extra: {damage: {fire: 5}}
            });

        spellCast.destroy();
    };

    return BallSpell;

    function move(self) {
        return self.commandHandlers.notify(new MoveCommand(getStepTowardsTarget()));

        function getStepTowardsTarget() {
            var currentPosition = self.tile.position;
            var targetPosition = self._.data.target.position;
            return {
                x: normalizeDirection(currentPosition.x, targetPosition.x),
                y: normalizeDirection(currentPosition.y, targetPosition.y),
            };
        }

        function normalizeDirection(source, destination) {
            var step = destination - source;
            if (step === 0)
                return 0;
            return step / Math.abs(step);
        }
    }
})
;