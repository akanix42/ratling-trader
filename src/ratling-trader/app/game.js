define(function (require) {
    var when = require('when'),
        ROT = require('rot');
    return Constructor;

    function Constructor(ui) {
        var self = this;

        self.run = run;

        function run() {
            if (!ROT.isSupported()) {
                alert("The rot.js library isn't supported by your browser.");
                return;
            }
            ui.init();
        }

    }
});