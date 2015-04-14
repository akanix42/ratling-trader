define(function (require) {
    var MoveCommand = require('game/commands/move-command');

    function GenericWandering() {

    }

    GenericWandering.prototype.execute = wander;

    function wander(entity) {
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

    return GenericWandering;
});