define(function () {
    function AbstractMixin() {
        this._private = {
            intentHandlers: [],
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
        applyTo: function applyTo(entity) {
            for (var i = 0; i < this._private.intentHandlers.length; i++) {
                var intentHandler = this._private.intentHandlers[i];
                entity.tile.intentHandlers.add(entity, intentHandler);
            }
        },

    };

    return AbstractMixin;
});