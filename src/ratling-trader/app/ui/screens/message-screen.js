define(function (require) {
    var GameEventReceivedEvent = require('ui/events/game-event-received-event');
    var EntityAttackedEvent = require('game/events/entity-attacked-event');
    var EntityDestroyedEvent = require('game/events/entity-destroyed-event');
    var stringformat = require('stringformat');

    'use strict';
    var handledMessages = getHandledMessagesMap();

    function MessageScreen(display, uiToGameBridge) {
        this._private = {
            display: display,
        };

        uiToGameBridge.eventHandlers.subscribe(null, {
            'class': GameEventReceivedEvent,
            handler: displayMessage.bind(this)
        });
    }

    return MessageScreen;


    function displayMessage(receivedEvent) {
        var event = receivedEvent.event;
        var formatter = handledMessages[event.constructor.name];
        if (!formatter) return;

        var messages = this._private.display.messages;
        messages.unshift(stringformat(formatter, event));
    }

    function getHandledMessagesMap() {
        var handledMessages = {};
        handledMessages[EntityAttackedEvent.name] = '{attacker.type} hits {target.type}';
        handledMessages[EntityDestroyedEvent.name] = '{attacker.type} kills {target.type}';
        return handledMessages;
    }
});