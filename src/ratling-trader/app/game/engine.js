define(function (require) {

    return Constructor;

    function Constructor() {
        var self = this;

        self.processCommand = processCommand;

        function processCommand() {
            return 'processed!';
        }
    }
});