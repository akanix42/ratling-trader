define(function (require) {
    var GameEventReceivedEvent = require('ui/events/game-event-received-event');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');
    var AoeDamageEvent = require('game/events/aoe-damage-event');
    var EventPerceivedEvent = require('game/events/event-perceived-event');
    var stringformat = require('stringformat');

    'use strict';
    var handledMessages = getHandledMessagesMap();

    function MessageScreen(display, uiToGameBridge) {
        this._private = {
            display: display,
        };

        uiToGameBridge.gameEventHandlers.subscribe(this, {
            'class': EventPerceivedEvent,
            handler: unwrapAndDisplayMessage.bind(this)
        });
    }

    return MessageScreen;

    function unwrapAndDisplayMessage(event) {
        displayMessage.call(this, event.event);
    }

    function displayMessage(event) {
        var formatter = handledMessages[event.constructor.name];
        if (!formatter) return;

        var messages = this._private.display.messages;
        var messagesArray = messages();
        messagesArray.unshift(stringformat(formatter, event));
        messagesArray.length = 20;
        messages(messagesArray);
    }

    function getHandledMessagesMap() {
        var handledMessages = {};
        handledMessages[EntityAttackedEvent.name] = '{attacker.type} hits {target.type}';
        handledMessages[EntityDestroyedEvent.name] = '{attacker.type} kills {target.type}';
        handledMessages[AoeDamageEvent.name] = 'fireball explodes';
        return handledMessages;
    }
});