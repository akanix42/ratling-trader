define(function (require) {
    var Injector = require('injector'),
        PlayingScreenFactory = require('ui/screens/playing-screen-factory'),
        LosingScreenFactory = require('ui/screens/losing-screen-factory'),
        WinningScreenFactory = require('ui/screens/winning-screen-factory'),
        MapFactory = require('game/map/map-factory'),
        TileFactory = require('game/tile/tile-factory'),
        Game = require('game'),
        Engine = require('game/engine'),
        UI = require('ui/ui'),
        DebugLogger = require('debug-logger');

    return CompositionRoot;

    function CompositionRoot() {
        var self = this;
        var injector = self.injector = new Injector();

        injector.register('PlayingScreenFactory', PlayingScreenFactory);
        injector.register('LosingScreenFactory', LosingScreenFactory);
        injector.register('WinningScreenFactory', WinningScreenFactory);
        injector.register('MapFactory', MapFactory);
        injector.register('TileFactory', TileFactory);
        injector.register('Game', Game);
        injector.register('Engine', Engine, true);
        injector.register('Logger', DebugLogger, true);
        injector.register('UI', UI);
    }
});