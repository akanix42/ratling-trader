define(function (require) {
    var forceNew = require('force-new');

    return forceNew.whenCalled(moveIntent);

    function moveIntent(entity, destination) {
        this.entity = entity;
        this.destination = destination;
    }
});