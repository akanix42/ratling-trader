define(function (require) {
    //var PlayingScreen = require('ui/screens/playing-screen');


    function getCommandMap() {
        var commands = {keydown: {}, keyup: {}, keypress: {}};
        var keydown = commands.keydown,
            keyup = commands.keyup;
        //keyup[ROT.VK_RETURN] = win;
        //keyup[ROT.VK_ESCAPE] = lose;
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


        //function lose() {
        //    this._private.ui.screens.push(this._private.losingScreenFactory.create());
        //
        //    screenManager.switchTo('losingScreen');
        //}
        //
        //function win() {
        //    screenManager.switchTo('winningScreen');
        //}
    }

    function PlayingScreen(display, ui, uiToGameBridge, asciiTileFactory) {
        this._private = {
            display: display,
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory,
            //commandMap: getCommandMap()

        };
        //uiToGameBridge.startGame();
    }

    PlayingScreen.prototype = {
        render: function render() {
            var display = this._private.display;
            var tiles = this._private.uiToGameBridge.gameState.level.tiles;
            for (var x = 0; x < display.size.width; x++) {
                var column = tiles[x];
                for (var y = 0; y < display.size.height; y++) {
                    var tile;
                    var uiTile;
                    if (column === undefined || !column[y]) {
                        tile = 'null';//this._private.asciiTileFactory.nullTile;
                        uiTile = this._private.asciiTileFactory.nullTile;
                    }
                    else {
                        tile = column[y];
                        var entities = tile.entities.all();
                        uiTile = this._private.asciiTileFactory.create(entities[entities.length - 1].type);
                    }
                    uiTile.draw(display, x, y);
                }
            }
        },
        handleInput: function handleInput(inputType, inputData) {
            var command = this._private.commandMap[inputType][inputData.keyCode];

            if (typeof command === 'function')
                command();
            else {
                this._private.uiToGameBridge.queueInput(command);
                //game.processCommand(command);
            }
        }
    };

    //return PlayingScreen;
    function PlayingScreenFactory(injector) {
        this._private = {
            injector: injector
        };
    }

    PlayingScreenFactory.prototype.create = function create() {
        return this._private.injector.inject(PlayingScreen)
    };

    PlayingScreenFactory.constructs = PlayingScreen;

    return PlayingScreenFactory;
});