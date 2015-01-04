define(function (require) {
    var forceNew = require('force-new');
    return forceNew.whenCalled(beforeMoveEvent);

    function beforeMoveEvent(entity, destination) {
        this.entity = entity;
        this.destination = destination;
        this.blockedBy = null;
    }
});