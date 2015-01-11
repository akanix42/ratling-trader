define(function (require) {
    var ROT = require('rot'),
        GameCommands = require('enums/commands');

    return PlayingScreen;

    function PlayingScreen(screenManager, display, game, asciiTiles) {
        var self = this,
            gameCommands = getCommands();

        self.enter = enter;
        self.exit = exit;
        self.render = render;
        self.handleInput = handleInput;

        var referenceLevelToScreenPoint = {
            x: null,
            y: null
        };

        function render() {
            var gameState = game.getGameState();
            if (gameState.isGameOver)
                screenManager.switchTo('losingScreen');

            var cameraPosition = calculateCameraCoordinates(gameState.cursorPosition, gameState.level, referenceLevelToScreenPoint);
            var level = gameState.level;
            for (var x = cameraPosition.x; x < cameraPosition.x + display.getOptions().width; x++) {
                for (var y = cameraPosition.y; y < cameraPosition.y + display.getOptions().height; y++) {
                    var gameTile = level.getTile(x, y);
                    asciiTiles
                        .get(gameTile)
                        .draw(display, x - cameraPosition.x, y - cameraPosition.y);
                }
            }
        }

        function calculateCameraCoordinates(cursorPosition, level, reference) {
            var calculatedX = calculateCameraCoordinate(cursorPosition.x, display.getOptions().width, level.getWidth(), reference.x);
            var calculatedY = calculateCameraCoordinate(cursorPosition.y, display.getOptions().height, level.getHeight(), reference.y);

            reference.x = calculatedX.reference;
            reference.y = calculatedY.reference;
            return {
                x: calculatedX.camera,
                y: calculatedY.camera
            };
        }

        function calculateCameraCoordinate(cursorCoordinate, screenSize, mapSize, reference) {
            var halfMap = mapSize / 2;
            var halfScreen = screenSize / 2;
            //var cursorScreenCoordinate = cursorCoordinate - reference;

            if (mapSize < screenSize)
                return getCameraCoordinate(halfMap - halfScreen, reference);
            if (cursorCoordinate < halfScreen)
                return getCameraCoordinate(0, reference);
            if (cursorCoordinate > mapSize - halfScreen)
                return getCameraCoordinate(mapSize - screenSize, reference);

            return getCameraCoordinate(cursorCoordinate - halfScreen, reference);
        }

        function getCameraCoordinate(position, reference) {
            if (reference === undefined)
                throw "Reference must be defined.";
            if (reference === null)
                reference = position;

            return {
                camera: position,
                reference: reference
            };
        }

        function handleInput(inputType, inputData) {
            var command = gameCommands[inputType][inputData.keyCode];

            if (typeof command === 'function')
                command();
            else {
                var result = game.processCommand(command);
                //                    if (!result.error)
                // render();
            }

        }

        function enter() {
            game.enterWorld();
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
                screenManager.switchTo('losingScreen');
            };
            function win() {
                screenManager.switchTo('winningScreen');
            };
        }
    }
});