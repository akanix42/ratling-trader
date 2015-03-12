define(function () {
    function AbstractMixin() {
        this._private = {
            intentHandlers: [],
            commandHandlers: [],
            eventHandlers: [],
            entityEventHandlers: [],
            init: null
        };
    }

    AbstractMixin.prototype = {
        get init() {
            return this._private.init;
        },
        addIntentHandler: function addEvent(EventClass, callback) {
            this._private.intentHandlers.push({class: EventClass, handler: callback.bind(this)})
        },
        addCommandHandler: function addEvent(EventClass, callback) {
            this._private.commandHandlers.push({class: EventClass})
        },
        addEventHandler: function addEvent(EventClass, callback) {
            this._private.eventHandlers.push({class: EventClass, handler: callback.bind(this)})
        },
        addEntityEventHandler: function addEvent(EventClass, callback) {
            this._private.entityEventHandlers.push({class: EventClass, handler: callback.bind(this)})
        },
        applyTo: function applyTo(entity) {
            var self = this;
            for (var i = 0; i < self._private.intentHandlers.length; i++) {
                var intentHandler = self._private.intentHandlers[i];
                entity.tile.intentHandlers.add(entity, intentHandler);
            }

            for (var i = 0; i < self._private.eventHandlers.length; i++) {
                var eventHandler = self._private.eventHandlers[i];
                entity.tile.eventHandlers.subscribe(entity, eventHandler);
            }

            for (var i = 0; i < self._private.entityEventHandlers.length; i++) {
                var eventHandler = self._private.entityEventHandlers[i];
                entity.eventHandlers.subscribe(entity, eventHandler);
            }

            for (var i = 0; i < self._private.commandHandlers.length; i++) {
                var commandHandler = self._private.commandHandlers[i];
                commandHandler.handler = self.execute.bind(self);
                entity.commandHandlers.subscribe(entity, commandHandler);
            }
        },

    };

    return AbstractMixin;
});