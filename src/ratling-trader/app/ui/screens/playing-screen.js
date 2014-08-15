define(function (require) {
        var ROT = require('rot'),
            GameCommands = require('enums/commands');

        return Constructor;

        function Constructor(ui, logger) {
            var gameCommands = getCommands();
            var display = ui.getDisplay();
            var engine = ui.getEngine();

            var self = this;

            self.enter = enter;
            self.exit = exit;
            self.render = render;
            self.handleInput = handleInput;

            function render() {
                var foreground, background, colors;
                for (var i = 0; i < 15; i++) {
                    // Calculate the foreground color, getting progressively darker
                    // and the background color, getting progressively lighter.
                    foreground = ROT.Color.toRGB([255 - (i * 20),
                                                  255 - (i * 20),
                                                  255 - (i * 20)]);
                    background = ROT.Color.toRGB([i * 20, i * 20, i * 20]);
                    // Create the color format specifier.
                    colors = "%c{" + foreground + "}%b{" + background + "}";
                    // Draw the text at col 2 and row i
                    display.drawText(2, i, colors + "Hello, world!");
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