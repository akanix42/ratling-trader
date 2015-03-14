define(function (require) {
    function NullIntentHandlers(nullTile) {
        this._private = {
            intents: {},
            nullTile: nullTile
        };
    }

    NullIntentHandlers.prototype.notify = function notify() {
        return [this._private.nullTile];
    };

    NullIntentHandlers.prototype.add = function add(entity, intent) {
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

    NullIntentHandlers.prototype.remove = function remove() {
    };

    function NullIntentHandlersFactory() {

    }

    NullIntentHandlersFactory.prototype.create = function create(tile) {
        return new NullIntentHandlers(tile);
    };

    return NullIntentHandlersFactory;
});