define(function (require) {
    var forceNew = require('force-new');

    var eventHub = createEventHub();
    return forceNew.whenCalled(eventHub);

    function createEventHub() {
        function eventHub() {
            this.internal = {events: {}};
        }

        eventHub.prototype.broadcast = function broadcast(event) {
            var events = this.internal.events;
            var subscriptions = events[event.constructor];
            if (subscriptions === undefined)
                return;

            for (var i = 0; i < subscriptions.length; i++) {
                var subscription = subscriptions[i];
                subscription.handler.call(subscription.entity, event);
            }
        };

        eventHub.prototype.subscribe = function subscribe(entity, event, handler) {
            var events = this.internal.events;
            if (!(event.constructor in events))
                events[event.constructor] = [];
            events[event.constructor].push({entity: entity, handler: handler});
        };

        eventHub.prototype.subscribeAll = function subscribe(entity, events) {
            var self = this;

            for (var i = 0, l = events.length; i < l; i++) {
                var event = events[i];
                self.subscribe(entity, event.fn, event.callback);
            }
        };

        eventHub.prototype.unsubscribe = function unsubscribe(entity, event) {
            var events = this.internal.events;
            var subscriptions = events[event.constructor];
            if (subscriptions === undefined)
                return;

            for (var i = 0; i < subscriptions.length; i++) {
                var subscription = subscriptions[i];
                if (entity === subscription.entity)
                    subscriptions.splice(entity, 1);
            }
        };
        return eventHub;
    }
});