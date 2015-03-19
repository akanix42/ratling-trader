define(function () {
    function EventRecorder() {
        this._private = {};
        this._private.eventsMap = new Map();
        this._private.events = [];

    }

    EventRecorder.prototype.record = function record(event) {
        if (this._private.eventsMap.get(event))
            return;
        this._private.events.push(event);
        this._private.eventsMap.set(event, null);
        //
        //console.log(event);
    };

    return EventRecorder;
});