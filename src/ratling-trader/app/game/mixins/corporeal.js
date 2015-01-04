define(function (require) {
    return corporeal;

    function corporeal() {
        return {
            beforeMove: beforeMove
        };

        function beforeMove(event) {
            var self = this;
            if (self.raiseEvent)
                event.block(self);
        }
    }
});