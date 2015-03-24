define(function (require) {
    var GameCommands = require('enums/commands');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var AttackCommand = require('game/commands/attack-command');
    var arrayExtensions = require('array-extensions');
    var ItemPickupCommand = require('game/commands/item-pickup-command');
    var ko = require('knockout');

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

        return commands;

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

    function InventoryScreen(display, ui, uiToGameBridge, asciiTileFactory) {
        this._private = {
            display: display,
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory,
            commandMap: getCommandMap.call(this),
            viewModel: {}
        };

        ko.components.register('inventory-screen', {
            viewModel: {instance: this._private.viewModel},
            template: {require: 'text!ui/screens/inventory-screen.html'},
        });
    }

    InventoryScreen.prototype = {
        render: function render() {
            this._private.display.koComponent('inventory-screen');
        },
        handleInput: function handleInput(inputType, inputData) {
            //var command = this._private.commandMap[inputType][inputData.keyCode];
            //if (!command) return;
            //
            //if (typeof command === 'function')
            //    command = command();
            //if (command)
            //    this._private.uiToGameBridge.queueInput(command);
            //game.processCommand(command);
        }
    };

    function InventoryScreenFactory(injector) {
        this._private = {
            injector: injector
        };
    }

    InventoryScreenFactory.prototype.create = function create() {
        return this._private.injector.inject(InventoryScreen)
    };

    InventoryScreenFactory.constructs = InventoryScreen;

    return InventoryScreenFactory;

});