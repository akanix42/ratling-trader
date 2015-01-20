define(function () {

    function Ui(uiToGameBridge, screenStack, mainMenuScreenFactory) {
        this._private = {
            screens: screenStack,
            uiToGameBridge: uiToGameBridge,
            mainMenuScreenFactory: mainMenuScreenFactory,
        };
        uiToGameBridge.ui = this;
    }

    Ui.prototype = {
        get screens() {
            return this._private.screens;
        },
        get uiBridge() {
            return this._private.uiToGameBridge;
        },
        init: function init(){
            //this.screens.push(this._private.playingScreenFactory.create());
            this.screens.push(this._private.mainMenuScreenFactory.create(this));
        }

    };

    //
    //function UiFactory(screenStack) {
    //    this._private = {
    //        screenStack: screenStack
    //    };
    //}
    //
    //UiFactory.prototype.create = function create(uiToGameBridge) {
    //    return new Ui(uiToGameBridge, this._private.screenStack);
    //};

    return Ui;
});