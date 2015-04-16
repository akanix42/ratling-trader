define(function () {
    function EventRecorder() {
        this._private = {};
        this._private.eventsMap = new Map();
        this._private.events = [];
        this._private.gameToUiBridge = null;
    }

    EventRecorder.prototype = {
        set gameToUiBridge(bridge) {
            this._private.gameToUiBridge = bridge;
        }
    };

    EventRecorder.prototype.record = function record(event) {
        if (this._private.eventsMap.get(event))
            return;
        this._private.events.push(event);
        this._private.eventsMap.set(event, null);
        //if (this._private.gameToUiBridge)
        //    this._private.gameToUiBridge.sendEvent(event);
    };


    return EventRecorder;
});