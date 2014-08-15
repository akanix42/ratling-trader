define(function (require) {
    var Display = require('ui/display')
    return Constructor;

    function Constructor() {
        var self = this;
        self.get = get;

        function get() {
            return new Display();
        }
    }
});