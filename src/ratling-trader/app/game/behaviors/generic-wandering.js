define(function (require) {
    var MoveCommand = require('game/commands/move-command');

    function GenericWandering() {

    }

    GenericWandering.prototype.execute = wander;

    function wander(entity) {
        if (searchForTargetInRange(entity)) {
            entity._private.stateMachine.switchTo('attacking', entity);
            return true;
        }
        entity.commandHandlers.notify(new MoveCommand(getRandomDirection()));
        return true;
    }

    function getRandomDirection() {
        return {
            x: normalizeDirection(ROT.RNG.getUniform()),
            y: normalizeDirection(ROT.RNG.getUniform()),
        };
    }

    function normalizeDirection(value) {
        return Math.round(value * 2 - 1);
    }

    function searchForTargetInRange(attacker) {
        var fov = Object.keys(attacker.tilesInFov).randomize();
        for (var i = 0; i < fov.length; i++) {
            var tile = attacker.tile.level.getTileAtPosition(attacker.tilesInFov[fov[i]]);
            if (tile === attacker.tile) continue;
            var target = searchTileForTarget(tile);
            if (target !== undefined)
                return !!(attacker.data.target = target);
        }
    }

    function searchTileForTarget(tile) {
        var creatures = tile.entities.airSpace;
        for (var i = 0; i < creatures.length; i++) {
            var creature = creatures[i];
            //if (creature.type === 'player' || creature.type === 'test')
                return creature;
        }
    }

    return GenericWandering;
});