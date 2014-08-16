define(function (require) {

    return Constructor;

    function Constructor(mapFactory) {
        var self = this;
        var levels = {};

        self.processCommand = processCommand;
        self.enterWorld = enterWorld;
        self.getLevels = getLevels;
        self.getCurrentLevel = getCurrentLevel;
        self.setCurrentLevel = setCurrentLevel;

        function processCommand() {
            return 'processed!';
        }

        function enterWorld() {
            setCurrentLevel(levels.world = {map: mapFactory.get()});

        }

        function getLevels() {
            return levels;
        }

        function getCurrentLevel() {
            return levels.currentLevel;
        }

        function setCurrentLevel(level) {
            levels.currentLevel = level;
        }
    }
});