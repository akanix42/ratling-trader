define(function (require) {
    var ko = require('knockout');

    function Display() {
        var self = this;
        self._private = {};
        self._private.display = createDisplay();
        self._private.viewModel = createViewModel();

        ko.applyBindings(self._private.viewModel);

        function createDisplay() {
            var height = 24,
                width = Math.floor(document.getElementById('ui').offsetWidth / 11);

            if (width % 2 !== 0)
                width = 2 * Math.round((width - 1) / 2);
            self._private.size = {width: width, height: height};
            var display = new ROT.Display({width: width, height: height, fontSize: 20, fontFamily: 'Arial'});
            ROT.Display.Rect.cache = true;
            var container = display.getContainer();

            document.getElementById('ui-screen').appendChild(container);

            return display;
        }

        function createViewModel(){
            return {
                component: ko.observable(),
                messages: ko.observableArray()
            };
        }
    }

    Display.prototype = {
        get koComponent() {
            return this._private.viewModel.component;
        },
        get messages() {
            return this._private.viewModel.messages;
        },
        get size() {
            return this._private.size;
        },
        draw: function () {
            this._private.display.draw.apply(this._private.display, arguments);
        }
    };
    return Display;

});