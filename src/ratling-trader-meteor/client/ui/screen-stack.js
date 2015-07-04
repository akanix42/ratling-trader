"use strict";
ScreenStack.typeName = "screenStack";
Ui.registerSingleton(ScreenStack.typeName, ScreenStack);

function ScreenStack() {
    this._ = {
        stack: []
    };
}

ScreenStack.prototype = {
    get currentScreen() {
        var stack = this._.stack;
        return stack[stack.length - 1];
    },
    push: function (screen) {
        this._.stack.push(screen);
        screen.show();
    },
    pop: function () {
        var screen = this._.stack.pop();
        if (screen.hide)
            screen.hide();
    }

};
