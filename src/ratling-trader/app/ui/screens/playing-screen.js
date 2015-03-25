define(function (require) {
    //var PlayingScreen = require('ui/screens/playing-screen');
    var GameCommands = require('enums/commands');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var AttackCommand = require('game/commands/attack-command');
    var arrayExtensions = require('array-extensions');
    var ItemPickupCommand = require('game/commands/item-pickup-command');

    function getCommandMap() {
        var commands = {keydown: {}, keyup: {}, keypress: {}};
        var keydown = commands.keydown,
            keyup = commands.keyup;
        //keyup[ROT.VK_RETURN] = win;
        //keyup[ROT.VK_ESCAPE] = lose;
        keydown[ROT.VK_LEFT] = handleMovementCommand.bind(this, GameCommands.GoLeft);
        keydown[ROT.VK_RIGHT] = handleMovementCommand.bind(this, GameCommands.GoRight);
        keydown[ROT.VK_UP] = handleMovementCommand.bind(this, GameCommands.GoUp);
        keydown[ROT.VK_DOWN] = handleMovementCommand.bind(this, GameCommands.GoDown);
        keydown[ROT.VK_NUMPAD4] = handleMovementCommand.bind(this, GameCommands.GoLeft);
        keydown[ROT.VK_NUMPAD7] = handleMovementCommand.bind(this, GameCommands.GoUpLeft);
        keydown[ROT.VK_NUMPAD8] = handleMovementCommand.bind(this, GameCommands.GoUp);
        keydown[ROT.VK_NUMPAD9] = handleMovementCommand.bind(this, GameCommands.GoUpRight);
        keydown[ROT.VK_NUMPAD6] = handleMovementCommand.bind(this, GameCommands.GoRight);
        keydown[ROT.VK_NUMPAD3] = handleMovementCommand.bind(this, GameCommands.GoDownRight);
        keydown[ROT.VK_NUMPAD2] = handleMovementCommand.bind(this, GameCommands.GoDown);
        keydown[ROT.VK_NUMPAD1] = handleMovementCommand.bind(this, GameCommands.GoDownLeft);
        keydown[ROT.VK_NUMPAD5] = GameCommands.WaitInPlace;
        keydown[ROT.VK_F1] = toggleRenderMode.bind(this);
        keydown[ROT.VK_COMMA] = handlePickupCommand.bind(this);
        keydown[ROT.VK_I] = showInventoryCommand.bind(this);

        return commands;

    }

    function showInventoryCommand() {
        this._private.ui.screens.push(this._private.inventoryScreen);
    }

    function handleMovementCommand(moveCommand) {
        var player = this._private.uiToGameBridge.gameState.player;

        var target = player.tile.getNeighbor(moveCommand.direction).entities.airSpace.last();

        return target ? new AttackCommand(target.tile.position) : moveCommand;
    }

    function handlePickupCommand() {
        var player = this._private.uiToGameBridge.gameState.player;
        var itemIndex = player.tile.entities.floorSpace.length - 1;

        return new ItemPickupCommand([itemIndex]);
    }

    function toggleRenderMode() {
        if (this._private.renderMode === 'fov')
            this._private.renderMode = 'all';
        else
            this._private.renderMode = 'fov'

        this.render();
    }

    function PlayingScreen(display, ui, uiToGameBridge, asciiTileFactory, inventoryScreen) {
        this._private = {
            display: display,
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory,
            commandMap: getCommandMap.call(this),
            renderMode: 'fov',
            inventoryScreen: inventoryScreen

        };
        window.display = display;
        uiToGameBridge.eventHandlers.subscribe(null, {
            class: ReadyForPlayerInputEvent,
            handler: this.render.bind(this)
        });
    }

    PlayingScreen.prototype = {
        render: function render() {
            if (this._private.renderMode === 'fov')
                renderFov.call(this);
            else
                renderLevel.call(this);
        },
        show: function show() {
            this.render();
        },
        hide: function () {
        },
        handleInput: function handleInput(inputType, inputData) {
            var command = this._private.commandMap[inputType][inputData.keyCode];
            if (!command) return;

            if (typeof command === 'function')
                command = command();
            if (command)
                this._private.uiToGameBridge.queueInput(command);
            //game.processCommand(command);
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

    function renderLevel() {
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
    }

    function renderFov() {
        var display = this._private.display;
        var tiles = this._private.uiToGameBridge.gameState.level.tiles;
        var fov = this._private.uiToGameBridge.gameState.player._private.tilesInFov;

        renderCurrentFov.call(this, display, tiles, fov);
        renderPreviousFov.call(this, display, tiles, fov);
        this._private.previousFov = fov;
    }

    function renderCurrentFov(display, tiles, fov) {
        var fovKeys = Object.keys(fov);
        for (var i = 0; i < fovKeys.length; i++) {
            var tileFovData = fov[fovKeys[i]];
            var tile = tiles[tileFovData.x][tileFovData.y];
            var entities = tile.entities.all();
            var uiTile = this._private.asciiTileFactory.create(entities[entities.length - 1].type);

            uiTile.draw(display, tileFovData.x, tileFovData.y, calculateOverlay(tileFovData.visibility));
        }
    }

    function calculateOverlay(visibility) {
        if (visibility < 1)
            return 'rgba(156,152,155,' + ((1 - visibility) / 4) + ')';
    }

    function renderPreviousFov(display, tiles, fov) {
        var previousFov = this._private.previousFov;
        if (previousFov) {
            var pFovKeys = Object.keys(previousFov);
            for (var i = 0; i < pFovKeys.length; i++) {
                var key = pFovKeys[i];
                if (fov[key]) continue;

                var tileFovData = previousFov[key];
                var tile = tiles[tileFovData.x][tileFovData.y];
                var entities = tile.entities;
                var entity = entities.floorSpace.last() || entities.architecture;
                uiTile = this._private.asciiTileFactory.create(entity.type);
                uiTile.draw(display, tileFovData.x, tileFovData.y, 'rgba(156,152,155,0.5)');
            }
        }
    }

    function renderTiles(tiles) {

    }
});