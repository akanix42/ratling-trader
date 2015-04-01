define(function (require) {
    var AttackCommand = require('game/commands/attack-command');
    return AttackEnemy;

    function AttackEnemy() {
        return {execute: attackEnemy};

        function attackEnemy(attacker) {
            var target = getTarget();
            if (target)
                return attacker.commandHandlers.notify(new AttackCommand(target));

            return false;

            function getTarget() {
                return verifyTarget() || searchForTargetInFov();
            }

            function verifyTarget() {
                var target = attacker.data.target;
                return target;
                //if (target.state === 'creature')
                //    return target;
                //
                //attacker.data.target = null;
            }

            function searchForTargetInFov() {
                var fov = Object.keys(attacker.tilesInFov).randomize();
                for (var i = 0; i < fov.length; i++) {
                    var tile = attacker.tile.level.getTileAtPosition(attacker.tilesInFov[fov[i]]);
                    if (tile === attacker.tile) continue;
                    var target = searchTileForTarget(tile);
                    if (target !== undefined)
                        return attacker.data.target = target;
                }
            }

            function searchTileForTarget(tile) {
                var creatures = tile.entities.airSpace;
                for (var i = 0; i < creatures.length; i++) {
                    var creature = creatures[i];
                    if (creature.type === 'player' || creature.type === 'test')
                        return creature;
                }
            }
        }

    }
});