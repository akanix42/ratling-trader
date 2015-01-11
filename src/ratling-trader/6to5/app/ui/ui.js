define(function (require) {
    var ROT = require('rot');

    return UI;

    function UI(game, screenManager, logger) {
        var self = this;

        self.init = init;
        //self.getScreens = getScreens;
        //self.switchScreen = switchScreen;
        //self.getDisplay = getDisplay;
        //self.getEngine = getEngine;
        self.getWidth = getWidth;
        self.getHeight = getHeight;
        self.update = update;
        game.setUI(self);

        function init() {
            //display = createDisplay();
            bindInputEvents();

            screenManager.switchTo('playingScreen');
        }
        //
        //function createDisplay() {
        //    width = Math.floor(document.getElementById('ui').offsetWidth / 11);
        //    if (width % 2 !== 0)
        //        width = 2 * Math.round((width - 1) / 2);
        //    logger.log(width);
        //    var display = new ROT.Display({width: width, height: height, fontSize: 20});
        //    ROT.Display.Rect.cache = true;
        //    var container = display.getContainer();
        //
        //    document.getElementById('ui-screen').appendChild(container);
        //
        //    return display;
        //}

        function bindInputEvents() {
            bindInputEvent('keydown');
            bindInputEvent('keyup');
            bindInputEvent('keypress');

            function bindInputEvent(event) {
                window.addEventListener(event, function (e) {
                    if (e.keyCode === ROT.VK_F5)
                        return;
                    e.preventDefault();
                    screenManager.handleInput(event, e);

                });
            }
        }

        function getWidth() {
            return width;
        }

        function getHeight() {
            return height;
        }

        function update() {
            screenManager.render();
        }
    }
});