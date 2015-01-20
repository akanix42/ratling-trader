define(function () {

    function TestDisplay(drawCallback) {
        this._private = {
            drawCallback: drawCallback
        };
        this.size = {
            width: 20,
            height: 20
        };
    }

    TestDisplay.prototype = {
        draw: function draw() {
            this._private.drawCallback.apply(this, arguments);
        }
    };

    return TestDisplay;
});