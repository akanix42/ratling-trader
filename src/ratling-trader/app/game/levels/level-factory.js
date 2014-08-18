define(function (require) {
    var Level = require('game/levels/level'),
        ROT = require('rot');

    return Constructor;

    function Constructor(mapFactory) {
        var self = this;

        self.get = get;

        function get(engine, levelType) {
            var level;
            if (levelType == 'world')
                level = new Level({engine: engine, map: mapFactory.get()});
            return level;
        }

    }

});