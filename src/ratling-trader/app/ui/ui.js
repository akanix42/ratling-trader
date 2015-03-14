define(function () {

    function Ui(uiToGameBridge, screenStack, mainMenuScreenFactory) {
        this._private = {
            screens: screenStack,
            uiToGameBridge: uiToGameBridge,
            mainMenuScreenFactory: mainMenuScreenFactory,
        };
        uiToGameBridge.ui = this;
        bindInputEvents();

        function bindInputEvents() {
            bindInputEvent('keydown');
            bindInputEvent('keyup');
            bindInputEvent('keypress');

            function bindInputEvent(event) {
                window.addEventListener(event, function (e) {
                    if (e.keyCode === ROT.VK_F5)
                        return;
                    e.preventDefault();
                    screenStack.currentScreen.handleInput(event, e);
                });
            }
        }

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