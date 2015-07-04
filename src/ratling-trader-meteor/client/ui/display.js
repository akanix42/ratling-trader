"use strict";
Display.typeName = "display";
Ui.registerSingleton(Display.typeName, Display);

var messages = new ReactiveArray();
var temporaryTemplate = new ReactiveVar();

function Display() {
    var self = this;
    self._ = {};
    self._.display = createDisplay();
    self._.viewModel = createViewModel();

    function createDisplay() {
        var height = 24,
            width = Math.floor(document.getElementById('ui').offsetWidth / 11);

        if (width % 2 !== 0)
            width = 2 * Math.round((width - 1) / 2);
        self._.size = {width: width, height: height};
        var display = new ROT.Display({width: width, height: height, fontSize: 20, fontFamily: 'Arial'});
        ROT.Display.Rect.cache = true;
        var container = display.getContainer();

        document.getElementById('ui-screen').appendChild(container);

        return display;
    }

    function createViewModel() {
        return {
            component: temporaryTemplate,
            messages: messages
        };
    }
}

Template.display.helpers({
    messages: messages,
    overlayTemplate: temporaryTemplate
});

Display.prototype = {
    get koComponent() {
        return this._.viewModel.component;
    },
    get messages() {
        return this._.viewModel.messages;
    },
    get size() {
        return this._.size;
    },
    draw: function () {
        this._.display.draw.apply(this._.display, arguments);
    }
};
