define(function () {
    return afterMoveEvent;

    function afterMoveEvent(entity, origin, destination) {
        return {
            entity: entity,
            origin: origin,
            destination: destination
        };
    }
});