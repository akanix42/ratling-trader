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


            function render() {
                var gameState = engine.getGameState(),
                    screenWidth = ui.getWidth(),
                    screenHeight = ui.getHeight(),
                    topLeftX = Math.min(Math.max(0, gameState.cursorPosition.x - (screenWidth / 2)), gameState.level.map.getWidth() - screenWidth),
                    topLeftY = Math.min(Math.max(0, gameState.cursorPosition.y - (screenHeight / 2)), gameState.level.map.getHeight() - screenHeight);

                var level = engine.getCurrentLevel();
                for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
                    for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                        asciiTiles
                            .get(level.map.getTile(x, y).getType())
                            .draw(display, x - topLeftX, y - topLeftY);
                    }
                }
                display.draw(
                        gameState.cursorPosition.x - topLeftX,
                        gameState.cursorPosition.y - topLeftY,
                    '@',
                    'white',
                    'black'
                );
            }

            function handleInput(inputType, inputData) {
                var command = gameCommands[inputType][inputData.keyCode];
                
                if (typeof command === 'function')
                    command();
                else {
                    var result = engine.processCommand(command);
                    if (!result.error)
                        render();
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