define(function (require) {
        var ROT = require('rot'),
            GameCommands = require('enums/commands');

        return Constructor;

        function Constructor(ui, logger, asciiTiles) {
            var self = this,
                gameCommands = getCommands(),
                display = ui.getDisplay(),
                engine = ui.getEngine();

            self.enter = enter;
            self.exit = exit;
            self.render = render;
            self.handleInput = handleInput;

            var drawCounter = 0;
            var previousTopLeftX = null;

            function render() {
                var gameState = engine.getGameState();
                if (gameState.isGameOver)
                    ui.switchScreen(ui.getScreens().losingScreen);

                var screenWidth = ui.getWidth(),
                    screenHeight = ui.getHeight(),
                    topLeftX = Math.min(0, Math.round(Math.min(Math.max(0, gameState.cursorPosition.x - (screenWidth / 2)), gameState.level.getMap().getWidth() - screenWidth))),
                    topLeftY = Math.min(0, Math.round(Math.min(Math.max(0, gameState.cursorPosition.y - (screenHeight / 2)), gameState.level.getMap().getHeight() - screenHeight)));
                topLeftX = (screenWidth - gameState.cursorPosition.x <= 5 || previousTopLeftX===null) ? gameState.cursorPosition.x - (Math.round(screenWidth / 2)) : previousTopLeftX;
                topLeftY = gameState.cursorPosition.y - (Math.round(screenHeight / 2))

                var level = engine.getCurrentLevel();
                for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
                    for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                        var gameTile = level.getMap().getTile(x, y);
                        asciiTiles
                            .get(gameTile)
                            .draw(display, x - topLeftX, y - topLeftY);
                    }
                }
                previousTopLeftX=topLeftX;
            }

            function handleInput(inputType, inputData) {
                var command = gameCommands[inputType][inputData.keyCode];

                if (typeof command === 'function')
                    command();
                else {
                    var result = engine.processCommand(command);
                    //                    if (!result.error)
                    // render();
                }

            }

            function enter() {
                engine.enterWorld();
            }

            function exit() {

            }

            function getCommands() {
                var commands = {keydown: {}, keyup: {}, keypress: {}};
                var keydown = commands.keydown,
                    keyup = commands.keyup;
                keyup[ROT.VK_RETURN] = win;
                keyup[ROT.VK_ESCAPE] = lose;
                keydown[ROT.VK_LEFT] = GameCommands.GoLeft;
                keydown[ROT.VK_RIGHT] = GameCommands.GoRight;
                keydown[ROT.VK_UP] = GameCommands.GoUp;
                keydown[ROT.VK_DOWN] = GameCommands.GoDown;
                keydown[ROT.VK_NUMPAD4] = GameCommands.GoLeft;
                keydown[ROT.VK_NUMPAD7] = GameCommands.GoUpLeft;
                keydown[ROT.VK_NUMPAD8] = GameCommands.GoUp;
                keydown[ROT.VK_NUMPAD9] = GameCommands.GoUpRight;
                keydown[ROT.VK_NUMPAD6] = GameCommands.GoRight;
                keydown[ROT.VK_NUMPAD3] = GameCommands.GoDownRight;
                keydown[ROT.VK_NUMPAD2] = GameCommands.GoDown;
                keydown[ROT.VK_NUMPAD1] = GameCommands.GoDownLeft;
                keydown[ROT.VK_NUMPAD5] = GameCommands.WaitInPlace;
                return commands;


                function lose() {
                    ui.switchScreen(ui.getScreens().losingScreen);
                };
                function win() {
                    ui.switchScreen(ui.getScreens().winningScreen);
                };
            }
        }


    }
)
;