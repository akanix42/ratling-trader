"use strict";
UiController.typeName = "uiController";
UiController.$inject = ["screenStack", "mainMenuScreenFactory"];
Ui.registerSingleton(UiController.typeName, UiController);

function UiController(screenStack, mainMenuScreenFactory) {
    this._ = {
        screens: screenStack,
        mainMenuScreenFactory: mainMenuScreenFactory,
    };

    bindInputEvents();

    function bindInputEvents() {
        Template.display.events({
            'keydown #ui, keyup #ui, keypress #ui': function (e) {
                if (e.keyCode === ROT.VK_F5)
                    return;
                e.preventDefault();
                screenStack.currentScreen.handleInput(event, e);
            }
        });
    }

}

UiController.prototype = {
    get screens() {
        return this._.screens;
    },
    init: function init() {
        //this.screens.push(this._private.playingScreenFactory.create());
        this.screens.push(this._.mainMenuScreenFactory.get());
    }

};
