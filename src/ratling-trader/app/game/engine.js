define(function (require) {
    var GameCommands = require('enums/commands');
    return Constructor;

    function Constructor(mapFactory, logger) {
        var self = this,
            levels = {},
            gameCommands = getCommands();

        self.processCommand = processCommand;
        self.enterWorld = enterWorld;
        self.getLevels = getLevels;
        self.getCurrentLevel = getCurrentLevel;
        self.setCurrentLevel = setCurrentLevel;
        self.getGameState = getGameState;

        var cursorPosition = {x: 0, y: 0};

        function processCommand(command) {
            if (!command || !(                command in gameCommands))
                return {error: 'invalid command'};

            gameCommands[command](command);

            return {};
        }

        function getGameState() {
            return {
                cursorPosition: cursorPosition,
                level: levels.currentLevel
            };
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

        function getCommands() {
            var commands = {};
            commands[GameCommands.GoLeft] = moveCursor;
            commands[GameCommands.GoRight] = moveCursor;
            commands[GameCommands.GoUp] = moveCursor;
            commands[GameCommands.GoDown] = moveCursor;

            return commands;
        }

        function moveCursor(command) {
            if (command === GameCommands.GoLeft)
                cursorPosition.x--;
            if (command === GameCommands.GoRight)
                cursorPosition.x++;
            if (command === GameCommands.GoUp)
                cursorPosition.y--;
            if (command === GameCommands.GoDown)
                cursorPosition.y++;
            cursorPosition.x = Math.max(0, Math.min(levels.currentLevel.map.getWidth() - 1, cursorPosition.x));
            cursorPosition.y = Math.max(0, Math.min(levels.currentLevel.map.getHeight() - 1, cursorPosition.y));
        }
    }
});