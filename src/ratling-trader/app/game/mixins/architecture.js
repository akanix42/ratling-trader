define(function (require) {

    return Destructible;

    function Destructible() {
        var self = this;

        self.isWalkable = isWalkable;

        function isWalkable() {
            return self.getData().isWalkable;
        }

    }
});