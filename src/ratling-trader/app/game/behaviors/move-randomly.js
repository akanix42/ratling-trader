define(function (require) {
    var ROT = require('rot');
    return MoveRandomly;

    function MoveRandomly() {
        return {execute: move};

        function move(self) {
            return self.raiseEvent('move', getRandomDirection());

            function getRandomDirection() {
                return {
                    x: normalizeDirection(ROT.RNG.getUniform()),
                    y: normalizeDirection(ROT.RNG.getUniform()),
                };
            }

            function normalizeDirection(value) {
                return value * 2 - 1;
            }

        }

    }
});