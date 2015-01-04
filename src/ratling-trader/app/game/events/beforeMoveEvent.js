define(function () {
    return beforeMoveEvent;

    function beforeMoveEvent(entity, destination) {
        return {
            entity: entity,
            destination: destination,
            blockedBy: null
        };
    }
});