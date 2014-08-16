define(function (require) {
        var ROT = require('rot'),
            GameCommands = require('enums/commands');

        return Constructor;

        function Constructor(ui, logger, asciiTiles) {
            var gameCommands = getCommands();
            var display = ui.getDisplay();
            var engine = ui.getEngine();

            var self = this;

            self.enter = enter;
            self.exit = exit;
            self.render = render;
            self.handleInput = handleInput;

            function render() {
                var level = engine.getCurrentLevel();
                for (var x = 0; x < level.map.getWidth(); x++) {
                    for (var y = 0; y < level.map.getHeight(); y++) {
                        asciiTiles.get(level.map.getTile(x, y).getType())
                            .draw(display, x, y);
                    }
                }
            }

            function handleInput(inputType, inputData) {
                if (!(inputData.keyCode in gameCommands))
                    return;

                var command = gameCommands[inputData.keyCode];
                if (command === undefined)
                    logger.warn(inputData.keyCode + ' is an invalid command');

                if (typeof command === 'function')
                    command();
                else
                    logger.log(engine.processCommand(command));
            }

            function enter() {
                engine.enterWorld();
            }

            function exit() {

            }

            function getCommands() {
                var commands = {};
                commands[ROT.VK_RETURN] = win;
                commands[ROT.VK_ESCAPE] = lose;
                commands[ROT.VK_LEFT] = GameCommands.GoLeft;
                commands[ROT.VK_RIGHT] = GameCommands.GoRight;
                commands[ROT.VK_UP] = GameCommands.GoUp;
                commands[ROT.VK_DOWN] = GameCommands.GoDown;

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