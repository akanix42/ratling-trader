define(function (require) {
    'use strict';
    var AoeDamageEvent = require('game/events/aoe-damage-event');
    var MoveCommand = require('game/commands/move-command');

    function FireballSpell(entityFactory) {
        this._private = {
            entityFactory: entityFactory
        };
    }

    FireballSpell.prototype = {
        //elements: {
        //    'fire'
        //},
        //effects: {
        //    'explodes',
        //    'damages'
        //}
    };
    FireballSpell.prototype.cast = function cast(caster, target) {
        var targetTile = caster.tile.level.getTileAt(target.x, target.y);
        this._private.entityFactory.create({
            type: 'fireball', target: targetTile, tile: caster.tile, spell: this,
            caster: caster
        });

        return true;
    };

    FireballSpell.prototype.act = function act(spellCast) {
        if (spellCast.data.target === spellCast.tile) {
            this.explode(spellCast);
            return true;
        }
        move(spellCast);

    };
    function move(self) {
        return self.commandHandlers.notify(new MoveCommand(getStepTowardsTarget()));

        function getStepTowardsTarget() {
            var currentPosition = self.tile.position;
            var targetPosition = self._private.data.target.position;
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

    FireballSpell.prototype.explode = function explode(spellCast) {
        var neighboringTiles = spellCast.tile.getNeighbors(1);
        var aoeDamageEvent = new AoeDamageEvent(spellCast, {fire: 5});
        for (var i = 0; i < neighboringTiles.length; i++)
            aoeDamageEvent.notifyTile(neighboringTiles[i]);

        spellCast.destroy();
    };

    return FireballSpell;
});