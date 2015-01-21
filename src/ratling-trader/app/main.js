define(function (require) {
    var ROT = require('rot');
    var iocLoader = require('ioc-loader');

    iocLoader.init()
        .then(function (ui) {
            ui.screens.currentScreen.newGame();
        });
});