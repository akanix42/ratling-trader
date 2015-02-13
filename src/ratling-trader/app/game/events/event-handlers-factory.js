define(function (require) {
    function EventHandlers() {
        this._private = {events: {}};
    }

    EventHandlers.prototype.notify = function notify(event) {
        var events = this._private.events;
        var subscriptions = events[event.constructor.name];
        if (subscriptions === undefined)
            return;

        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            subscription.handler(subscription.entity, event);
        }
    };

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

    function EventHandlersFactory() {

    }

    EventHandlersFactory.prototype.create = function create() {
        return new EventHandlers();
    };
    return EventHandlersFactory;
});