define(function (require) {

    return Constructor;

    function Constructor(type) {
        var self = this;
        self.getType = getType;

        function getType() {
            return type;
        }
    }
});