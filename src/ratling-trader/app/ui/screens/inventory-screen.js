define(function (require) {
    var GameCommands = require('enums/commands');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var AttackCommand = require('game/commands/attack-command');
    var arrayExtensions = require('array-extensions');
    var ItemPickupCommand = require('game/commands/item-pickup-command');
    var ko = require('knockout');
    var koPunch = require('knockout.punches');

    function getCommandMap() {
        var commands = {keydown: {}, keyup: {}, keypress: {}};
        var keydown = commands.keydown,
            keyup = commands.keyup;

        keydown[ROT.VK_ESCAPE] = hideScreen.bind(this);
        keydown[combineKeycodes([ROT.VK_ALT, ROT.VK_D])] = switchToDropMode.bind(this);

        return commands;

    }

    function switchToDropMode() {
        this.mode = 'drop';
    }

    function hideScreen() {
        this._private.ui.screens.pop();
    }

    function InventoryScreen(display, ui, uiToGameBridge, asciiTileFactory) {
        this._private = {
            display: display,
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory,
            commandMap: getCommandMap.call(this),
            viewModel: {
                items: ko.observableArray(),
                mode: ko.observable()
            },

        };

        ko.components.register('inventory-screen', {
            viewModel: {instance: this._private.viewModel},
            template: {require: 'text!ui/screens/inventory-screen.html'},
        });
    }

    InventoryScreen.prototype = {
        set mode(mode) {
            this._private.viewModel.mode(mode);
        },
        handleInput: function handleInput(inputType, inputData) {
            var command = this._private.commandMap[inputType][getKeyCode(inputData)];
            if (!command) return;

            if (typeof command === 'function')
                command = command();
            if (command)
                this._private.uiToGameBridge.queueInput(command);
        },
        hide: function () {
            this._private.display.koComponent(null);
        },
        show: function () {
            this._private.viewModel.items(this._private.uiToGameBridge.gameState.player.inventory.items);
            this._private.display.koComponent('inventory-screen');
        }
    };

    return InventoryScreen;

    function getKeyCode(inputData) {
        var keypress = inputData.keyCode;
        var keycodes = [];
        addModifer(ROT.VK_SHIFT, inputData.shiftKey);
        addModifer(ROT.VK_CONTROL, inputData.ctrlKey);
        addModifer(ROT.VK_ALT, inputData.altKey);

        keycodes.push(inputData.keyCode);

        return keycodes.join('+');

        function addModifer(modifierKeycode, isModiferPressed) {
            if (isModiferPressed && inputData.keyCode != modifierKeycode)
                keycodes.push(modifierKeycode);
        }
    }

    function combineKeycodes(keycodes) {
        var keycode = keycodes.splice(keycodes.length - 1, 1);

        keycodes.sort();
        keycodes.push(keycode);

        return keycodes.join('+');
    }

});