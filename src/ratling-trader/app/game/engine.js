define(function (require) {
        var GameCommands = require('enums/commands');
        return Constructor;

        function Constructor(mapFactory, logger, playerFactory) {
            var self = this,
                levels = {},
                actions = getActions(),
                player = playerFactory.get({}),
                isCursorLockedToPlayer = true;

            self.processCommand = processCommand;
            self.enterWorld = enterWorld;
            self.getLevels = getLevels;
            self.getCurrentLevel = getCurrentLevel;
            self.setCurrentLevel = setCurrentLevel;
            self.getGameState = getGameState;

            var cursorPosition = {x: 0, y: 0};

            function processCommand(command) {
                if (!command || !(command in actions))
                    return {error: 'invalid command'};

                var action = actions[command];
                action.execute(command, action);

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
                player.setLevel(getCurrentLevel());
                player.setPosition(5, 5);
                lockCursorToPlayer();

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

            function getActions() {
                var actions = {};
                actions[GameCommands.GoLeft] = {execute: movePlayerOrCursor, data: {x: -1}};
                actions[GameCommands.GoRight] = {execute: movePlayerOrCursor, data: {x: 1}};
                actions[GameCommands.GoUp] = {execute: movePlayerOrCursor, data: {y: -1}};
                actions[GameCommands.GoDown] = {execute: movePlayerOrCursor, data: {y: 1}};

                return actions;
            }

            function movePlayerOrCursor(command, action) {
                player.move(action.data.x || 0, action.data.y || 0);
                lockCursorToPlayer();
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
                if (isCursorLockedToPlayer)
                    player.setPosition(cursorPosition.x, cursorPosition.y);
            }

            function lockCursorToPlayer() {
                cursorPosition.x = player.getPosition().x;
                cursorPosition.y = player.getPosition().y;
            }
        }
    }
)
;