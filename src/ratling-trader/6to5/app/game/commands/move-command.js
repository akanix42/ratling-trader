define(function (require) {
    var forceNew = require('force-new');

    return forceNew.whenCalled(moveCommand);

    function moveCommand(direction) {
        this.direction = direction
    }
});
