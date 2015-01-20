define(function () {
    function Display() {
        var self = this;
        self._private = {};
        self._private.display = createDisplay();
        function createDisplay() {
            var height = 24,
                width = Math.floor(document.getElementById('ui').offsetWidth / 11);

            if (width % 2 !== 0)
                width = 2 * Math.round((width - 1) / 2);
            self._private.size = {width: width, height: height};
            var display = new ROT.Display({width: width, height: height, fontSize: 20});
            ROT.Display.Rect.cache = true;
            var container = display.getContainer();

            document.getElementById('ui-screen').appendChild(container);

            return display;
        }
    }

    Display.prototype = {
        get size() {
            return this._private.size;
        },
        draw: function () {
            this._private.display.draw.apply(this._private.display, arguments);
        }
    };
    return Display;

});