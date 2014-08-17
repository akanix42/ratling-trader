define(function (require) {

    return Constructor;

    function Constructor(data) {
        var self = this;

        self.getType = getType;
        self.getPosition = getPosition;
        self.setPosition = setPosition;
        self.setLevel = setLevel;
        self.getLevel = getLevel;
        self.move = move;

        function getType() {
            return data.type;
        }

        function getPosition() {
            return data.position;
        }

        function setPosition(x, y) {
            data.level.map.getTile(data.position.x, data.position.y).creature = null;
            data.position.x = x;
            data.position.y = y;

            var newTile = data.level.map.getTile(x, y);
            newTile.creature = self;
        }

        function setLevel(level) {
            data.level = level;
        }

        function getLevel() {
            return data.level;
        }

        function move(dX, dY) {
            var newX = Math.max(0, Math.min(data.level.map.getWidth() - 1, data.position.x + dX)),
                newY = Math.max(0, Math.min(data.level.map.getHeight() - 1, data.position.y + dY));

            var newTile = data.level.map.getTile(newX, newY);
            if (newTile.isWalkable())
                setPosition(newX, newY);
            else if (newTile.isDiggable())
                newTile.dig();

        }
    }
});