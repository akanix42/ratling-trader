define(function (require) {
        var GameCommands = require('enums/commands');
        return Constructor;

        function Constructor(levelFactory, logger, entityFactory) {
            var self = this,
                levels = {},
                actions = getActions(),
                player = entityFactory.get({type: 'player'}),
                isCursorLockedToPlayer = true,
                isGameOver = false,
                isProcessingCommand = false
                ;
            var ui;

            self.processCommand = processCommand;
            self.enterWorld = enterWorld;
            self.getLevels = getLevels;
            self.getCurrentLevel = getCurrentLevel;
            self.setCurrentLevel = setCurrentLevel;
            self.getGameState = getGameState;
            self.updateUI = updateUI;
            self.setUI = setUI;
            self.gameOver = gameOver;
            self.acceptInput = acceptInput;

            var cursorPosition = {x: 0, y: 0};

            function setUI(value) {
                ui = value;
            }

            function acceptInput() {
                isProcessingCommand = false;
            }

            function processCommand(command) {
                if (isProcessingCommand)
                    return;

                if (!command || !(command in actions))
                    return {error: 'invalid command'};

                isProcessingCommand = true;

                var action = actions[command];
                action.execute(command, action);
                return {};
            }

            function getGameState() {
                return {
                    cursorPosition: cursorPosition,
                    level: levels.currentLevel,
                    isGameOver: isGameOver
                };
            }

            function enterWorld() {
                logger.log('entering world');
                setCurrentLevel(levels.world = levelFactory.get(self, 'world'));
                logger.log('level loaded');

                player.setLevel(getCurrentLevel());
                player.setPosition(5, 5);
                lockCursorToPlayer();
                getCurrentLevel().resume();
                logger.log('entered world');

            }

            function gameOver() {
                getCurrentLevel().pause();
                isGameOver = true;
                updateUI();

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
                actions[GameCommands.GoUpLeft] = {execute: movePlayerOrCursor, data: {x: -1, y: -1}};
                actions[GameCommands.GoUpRight] = {execute: movePlayerOrCursor, data: {x: 1, y: -1}};
                actions[GameCommands.GoDownRight] = {execute: movePlayerOrCursor, data: {x: 1, y: 1}};
                actions[GameCommands.GoDownLeft] = {execute: movePlayerOrCursor, data: {x: -1, y: 1}};
                return actions;
            }

            function movePlayerOrCursor(command, action) {
                player.raiseEvent('performAction', 'move', action.data.x || 0, action.data.y || 0);
//                getCurrentLevel().resume();
                //                player.move(action.data.x || 0, action.data.y || 0);
                lockCursorToPlayer();
                updateUI();
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

            function updateUI(entity) {
                if (ui)
                    ui.update();
            }
        }
    }
)
;