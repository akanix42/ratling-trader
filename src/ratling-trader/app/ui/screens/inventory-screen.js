define(function (require) {
    var GameCommands = require('enums/commands');
    var ReadyForPlayerInputEvent = require('ui/events/ready-for-player-input-event');
    var AttackCommand = require('game/commands/attack-command');
    var arrayExtensions = require('array-extensions');
    var ItemPickupCommand = require('game/commands/item-pickup-command');
    var DropItemsCommand = require('game/commands/drop-items-command');
    var ko = require('knockout');
    var koPunch = require('knockout.punches');

    function getCommandMaps() {
        var commandMaps = {
            normal: getCommandMap.call(this),
            drop: getDropModeCommandMap.call(this)
        };
        return commandMaps;
    }

    function getCommandMap() {
        var commands = {keydown: {}, keyup: {}, keypress: {}};
        var keydown = commands.keydown,
            keyup = commands.keyup;

        keydown[ROT.VK_ESCAPE] = hideScreen.bind(this);
        keydown[combineKeycodes([ROT.VK_ALT, ROT.VK_D])] = switchToDropMode.bind(this);
        //bindRange(keydown, ROT.VK_A, ROT.VK_Z, toggleItemSelection.bind(this));
        return commands;

    }

    function getDropModeCommandMap() {
        var commands = {keydown: {}, keyup: {}, keypress: {}};
        var keydown = commands.keydown,
            keyup = commands.keyup;

        keydown[ROT.VK_ESCAPE] = hideScreen.bind(this);
        keydown[combineKeycodes([ROT.VK_ALT, ROT.VK_D])] = switchToNormalMode.bind(this);
        keydown[ROT.VK_RETURN] = dropSelectedItems.bind(this);
        bindRange(keydown, ROT.VK_A, ROT.VK_Z, toggleItemSelection.bind(this));
        return commands;

    }

    function switchToNormalMode() {
        this.mode = 'normal';
    }

    function switchToDropMode() {
        this.mode = 'drop';
    }

    function hideScreen() {
        this._private.ui.screens.pop();
    }

    function toggleItemSelection(inputData) {
        var index = inputData.keyCode - ROT.VK_A;
        var item = this._private.viewModel.items()[index];
        if (item)
            item.isSelected(!item.isSelected());
    }

    function dropSelectedItems() {
        var items = this._private.viewModel.items();
        if (!items.length)
            return;
        var itemsToDrop = [];
        for (var i = 0; i < items.length; i++)
            if (items[i].isSelected())
                itemsToDrop.push(i);

        if (!itemsToDrop.length)
            return;

        hideScreen.call(this);
        return new DropItemsCommand(itemsToDrop);
    }

    function InventoryScreen(display, ui, uiToGameBridge, asciiTileFactory) {
        var self = this;
        this._private = {
            display: display,
            ui: ui,
            uiToGameBridge: uiToGameBridge,
            asciiTileFactory: asciiTileFactory,
            commandMaps: getCommandMaps.call(this),
            viewModel: {
                items: ko.observableArray(),
                mode: ko.observable('normal')

            },

        };
        this._private.viewModel.modeCss = ko.computed(function () {
            return 'mode-' + self._private.viewModel.mode();
        });

        ko.components.register('inventory-screen', {
            viewModel: {instance: this._private.viewModel},
            template: {require: 'text!ui/screens/inventory-screen.html'},
        });
    }

    InventoryScreen.prototype = {
        set mode(mode) {
            this._private.viewModel.mode(mode);
        },
        get mode() {
            return this._private.viewModel.mode();
        },
        handleInput: function handleInput(inputType, inputData) {
            var command = this._private.commandMaps[this.mode][inputType][getKeyCode(inputData)];
            if (!command) return;

            if (typeof command === 'function')
                command = command(inputData);
            if (command)
                this._private.uiToGameBridge.queueInput(command);
        },
        hide: function () {
            this._private.display.koComponent(null);
            this.mode = 'normal';
        },
        show: function () {
            this._private.viewModel.items(importItems(this._private.uiToGameBridge.gameState.player.inventory.items));
            this._private.display.koComponent('inventory-screen');
        }
    };

    function importItems(itemsToImport) {
        var items = [];
        for (var i = 0; i < itemsToImport.length; i++) {
            items[i] = importItem(itemsToImport[i]);
        }
        return items;
    }

    function importItem(itemToImport) {
        return {
            isSelected: ko.observable(false),
            type: itemToImport.type
        };
    }

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

    function bindRange(map, start, end, command) {
        for (var i = start; i <= end; i++)
            map[i] = command;
    }
});