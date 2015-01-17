define(function (require) {
    function IntentHub() {
        this._private = {intents: {}};
    }

    IntentHub.prototype.broadcast = function broadcast(intent) {
        var intents = this._private.intents;
        var subscriptions = intents[intent.constructor.name];
        if (subscriptions === undefined)
            return [];

        var objections = [];
        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            var objection = subscription.handler(subscription.entity, intent);
            if (objection !== undefined)
                objections.push(objection);
        }
        return objections;
    };

    IntentHub.prototype.subscribe = function subscribe(entity, intent) {
        var intents = this._private.intents;
        if (!(intent.class.name in intents))
            intents[intent.class.name] = [];
        intents[intent.class.name].push({entity: entity, handler: intent.handler});
    };

    IntentHub.prototype.subscribeAll = function subscribe(entity, intents) {
        var self = this;

        for (var i = 0, l = intents.length; i < l; i++) {
            var intent = intents[i];
            self.subscribe(entity, intent.fn, intent.callback);
        }
    };

    IntentHub.prototype.unsubscribe = function unsubscribe(entity, intent) {
        var intents = this._private.intents;
        var subscriptions = intents[intent.constructor.name];
        if (subscriptions === undefined)
            return;

        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            if (entity === subscription.entity)
                subscriptions.splice(entity, 1);
        }
    };
    return IntentHub;
});