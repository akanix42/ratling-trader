define(function () {
    var counter = 0;
    return tileEventHub;


    function tileEventHub() {
        var events = {};
        var id = counter++;

        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            raise: raise,
            id: id
        };

        function subscribe(entity, event, handler) {
            if (!(event.constructor in events))
                events[event.constructor] = [];
            events[event.constructor].push({entity: entity, handler: handler});
        }

        function unsubscribe(entity, event) {
            var subscriptions = events[event.constructor];
            if (subscriptions === undefined)
                return;

            for (var i = 0; i < subscriptions.length; i++) {
                var subscription = subscriptions[i];
                if (entity === subscription.entity)
                    subscriptions.splice(entity, 1);
            }
        }

        function raise(event) {
            var subscriptions = events[event.constructor];
            if (subscriptions === undefined)
                return;

            for (var i = 0; i < subscriptions.length; i++) {
                var subscription = subscriptions[i];
                subscription.handler.call(subscription.entity, event);
            }
        }
    }
});