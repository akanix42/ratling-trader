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
        self.act = act;

        function getType() {
            return data.type;
        }

        function getPosition() {
            return data.position;
        }

        function setPosition(x, y) {
            data.level.getMap().getTile(data.position.x, data.position.y).creature = null;
            data.position.x = x;
            data.position.y = y;

            var newTile = data.level.getMap().getTile(x, y);
            newTile.creature = self;
        }

        function setLevel(level) {
            data.level = level;
            level.addEntity(self);
        }

        function getLevel() {
            return data.level;
        }

        function move(dX, dY) {
            var newX = Math.max(0, Math.min(data.level.getMap().getWidth() - 1, data.position.x + dX)),
                newY = Math.max(0, Math.min(data.level.getMap().getHeight() - 1, data.position.y + dY));

            var newTile = data.level.getMap().getTile(newX, newY);
            if (newTile.isWalkable())
                setPosition(newX, newY);
            else if (newTile.isDiggable())
                newTile.dig();

         //   data.level.getEngine().updateUI(self);
            data.level.resume();
        }

        function act() {
            data.level.getEngine().updateUI(self);
            data.level.pause();
        }
    }
});