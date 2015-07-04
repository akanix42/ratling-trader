"use strict";
Ui.loader = new UiLoader();
function UiLoader() {

}

UiLoader.prototype.load = function load() {
    var uiController = window.uiController = Ui.container.get("uiController");
    return uiController;
};
