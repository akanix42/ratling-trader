"use strict";
MainMenuScreen.typeName = "mainMenuScreen";
MainMenuScreen.$inject = ["uiController", "playingScreenFactory"];
Ui.registerUnique(MainMenuScreen.typeName, MainMenuScreen);

function MainMenuScreen(ui, playingScreenFactory) {
    this.ui = ui;
    this.playingScreenFactory = playingScreenFactory;
}

MainMenuScreen.prototype = {
    loadGame: function () {
        var self = this;
        //return when(self._private.uiToGameBridge.loadGame())
        //    .then(function () {
        //        window.ui = self._private.ui;
        //        self._private.ui.screens.push(self._private.playingScreenFactory.create());
        //    });
    },
    newGame: function () {
        var self = this;
        //return when(self._private.uiToGameBridge.startGame())
        //    .then(function () {
        //        self._private.ui.screens.push(self._private.playingScreenFactory.create());
        //    });
    },
    render: function render() {

    },
    show: function show() {
        this.ui.screens.push(this.playingScreenFactory.get());
    }
};
