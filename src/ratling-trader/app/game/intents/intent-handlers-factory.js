define(function (require) {
    function IntentHandlers() {
        this._private = {intents: {}};
    }

    IntentHandlers.prototype.notify = function notify(intent) {
        var intents = this._private.intents;
        var subscriptions = intents[intent.constructor.name];
        if (subscriptions === undefined)
            return [];

        var objections = [];
        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            var objection = subscription.handler(intent, subscription.entity);
            if (objection !== undefined)
                objections.push(objection);
        }
        return objections;
    };

    IntentHandlers.prototype.add = function add(entity, intent) {
        var intents = this._private.intents;
        if (!(intent.class.name in intents))
            intents[intent.class.name] = [];
        intents[intent.class.name].push({entity: entity, handler: intent.handler});
    };
    //
    //IntentHandlers.prototype.subscribeAll = function subscribe(entity, intents) {
    //    var self = this;
    //
    //    for (var i = 0, l = intents.length; i < l; i++) {
    //        var intent = intents[i];
    //        self.subscribe(entity, intent.fn, intent.callback);
    //    }
    //};

    IntentHandlers.prototype.remove = function remove(entity, intent) {
        var intents = this._private.intents;

        var subscriptions = intents[intent.name];
        if (subscriptions === undefined)
            return;

        for (var i = 0; i < subscriptions.length; i++) {
            var subscription = subscriptions[i];
            if (entity === subscription.entity)
                subscriptions.splice(entity, 1);
        }
    };

    function IntentHandlersFactory() {

    }

    IntentHandlersFactory.prototype.create = function create() {
        return new IntentHandlers();
    };

    return IntentHandlersFactory;
});