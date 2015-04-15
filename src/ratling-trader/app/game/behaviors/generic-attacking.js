define(function (require) {
    var AttackCommand = require('game/commands/attack-command');

    function GenericAttacking() {

    }

    GenericAttacking.prototype.execute = execute;

    function execute(attacker) {
        if (tryToPerformAttack(attacker))
            return true;

        attacker._private.stateMachine.switchTo('wandering', attacker);
        return true;
    }

    function tryToPerformAttack(attacker) {
        var target = getTarget(attacker);
        if (target) {
            attacker.commandHandlers.notify(new AttackCommand(target.tile.position));
            return true;
        }
    }

    function getTarget(attacker) {
        return verifyTarget(attacker) || searchForTargetInFov(attacker);
    }

    function verifyTarget(attacker) {
        var target = attacker.data.target;
        if (!target
            || !target.attributes.get('health').current
            || !isInRange(attacker.tile.position, target.tile.position))
            return null;

        return target;
        //if (target.state === 'creature')
        //    return target;
        //
        //attacker.data.target = null;
    }

    function isInRange(sourcePosition, targetPosition) {
        var range = 1;
        return getDistance(sourcePosition.x, sourcePosition.y, targetPosition.x, targetPosition.y) <= range;
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    }

    function searchForTargetInFov(attacker) {
        var fov = Object.keys(attacker.tilesInFov).randomize();
        for (var i = 0; i < fov.length; i++) {
            var tile = attacker.tile.level.getTileAtPosition(attacker.tilesInFov[fov[i]]);
            if (tile === attacker.tile || !isInRange(attacker.tile.position, tile.position)) continue;
            var target = searchTileForTarget(tile);
            if (target !== undefined)
                return attacker.data.target = target;
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

    return GenericAttacking;
});