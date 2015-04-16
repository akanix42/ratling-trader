define(function (require) {
    function EventHandlers(eventRecorder) {
        this._private = {
            events: {},
            eventRecorder: eventRecorder,
            wildcards: []
        };
        this.tile = null;
        this.entity = null;
    }

    EventHandlers.prototype.notify = function notify(event, entity, tile) {
        //this._private.eventRecorder.record(event);
        var events = this._private.events;
        var subscriptions = events[event.constructor.name];

        notifyEventSubscriptions(subscriptions, event);
        notifyWildcardSubscriptions.call(this, this._private.wildcards, event, entity, tile);
    };

    function notifyEventSubscriptions(subscriptions, event) {
        if (subscriptions === undefined)
            return;

        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            subscription.handler(event, subscription.entity);
        }
    }

    function notifyWildcardSubscriptions(wildcards, event, entity, tile) {
        for (var i = 0; i < wildcards.length; i++) {
            var subscription = wildcards[i];
            subscription.handler(event, subscription.entity, entity, tile);
        }
    }

    EventHandlers.prototype.subscribe = function subscribe(entity, event) {
        var events = this._private.events;
        if (!(event.class.name in events))
            events[event.class.name] = [];
        events[event.class.name].push({entity: entity, handler: event.handler});
    };
    //
    //EventHandlers.prototype.subscribeAll = function subscribe(entity, events) {
    //    var self = this;
    //
    //    for (var i = 0, l = events.length; i < l; i++) {
    //        var event = events[i];
    //        self.subscribe(entity, event.fn, event.callback);
    //    }
    //};

    EventHandlers.prototype.unsubscribe = function unsubscribe(entity, event) {
        var events = this._private.events;
        var subscriptions = events[event.constructor.name];
        if (subscriptions === undefined)
            return;

        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            if (entity === subscription.entity)
                subscriptions.splice(entity, 1);
        }
    };

    EventHandlers.prototype.subscribeToAny = function subscribeToAny(entity, handler) {
        var wildcards = this._private.wildcards;
        for (var i = 0; i < wildcards.length; i++)
            if (wildcards[i].entity === entity)
                return;

        wildcards.push({entity: entity, handler: handler});
    };

    EventHandlers.prototype.unsubscribeFromAny = function unsubscribeFromAny(entity, event) {
        var wildcards = this._private.wildcards;

        for (var i = 0; i < wildcards.length; i++) {
            var subscription = wildcards[i];
            if (entity === subscription.entity)
                wildcards.splice(entity, 1);
        }
    };
    function EventHandlersFactory(injector) {
        this._private = {injector: injector};
    }

    EventHandlersFactory.prototype.create = function create() {
        return this._private.injector.inject(EventHandlers);
    };
    return EventHandlersFactory;
});