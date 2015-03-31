define(function (require) {
    var ko = require('knockout');

    function TestDisplay(drawCallback) {
        this._private = {
            drawCallback: drawCallback,
            viewModel: {
                component: ko.observable()
            }
        };
        this.size = {
            width: 20,
            height: 20
        };
    }

    TestDisplay.prototype = {
        get koComponent() {
            return this._private.viewModel.component;
        },
        draw: function draw() {
            if (this._private.drawCallback)
                this._private.drawCallback.apply(this, arguments);
        }
    };

    return TestDisplay;
});