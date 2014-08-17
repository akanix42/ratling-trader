define(function (require) {
    var extend = require('lib/extend/extend'),
        EntityType = require('enums/entity-type')
        ;

    return Constructor;

    function Constructor(initialArchitecture) {
        var self = this,
            architecture = initialArchitecture;
        //        extend(self, type);
        self.getArchitecture = getArchitecture;
        self.dig = dig;
        self.isDiggable = isDiggable;
        self.isWalkable = isWalkable;

        function getArchitecture() {
            return architecture;
        }

        function dig(tile) {
            if (!isDiggable())
                return false;

            architecture = EntityType[architecture.baseEntity];
            return true;
        }

        function isDiggable() {
            return architecture.isDiggable && architecture.baseEntity;
        }

        function isWalkable() {
            return architecture.isWalkable;
        }
    }
});