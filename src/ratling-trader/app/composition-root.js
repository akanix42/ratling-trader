define(function (require) {
        var when = require('when'),
            Injector = require('injector'),
            PlayingScreenFactory = require('ui/screens/playing-screen-factory'),
            LosingScreenFactory = require('ui/screens/losing-screen-factory'),
            WinningScreenFactory = require('ui/screens/winning-screen-factory'),
            MapFactory = require('game/map/map-factory'),
            LevelFactory = require('game/levels/level-factory'),
            TileFactory = require('game/tiles/tile-factory'),
            EntityFactory = require('game/entities/entity-factory'),
            Game = require('game'),
            Engine = require('game/engine'),
            UI = require('ui/ui'),
            AsciiTiles = require('ui/tiles/ascii-tiles'),
            DebugLogger = require('debug-logger'),
            EntityTemplatesLoader = require('game/loaders/entity-templates-loader'),
            behaviorsLoader = require('promise!game/loaders/behaviors-loader'),
            Behaviors = require('game/behaviors');

        return CompositionRoot;

        function CompositionRoot() {
            var self = this;
            var injector = self.injector = new Injector();

            injector.register('PlayingScreenFactory', PlayingScreenFactory);
            injector.register('LosingScreenFactory', LosingScreenFactory);
            injector.register('WinningScreenFactory', WinningScreenFactory);
            injector.register('AsciiTiles', AsciiTiles, true);
            injector.register('MapFactory', MapFactory);
            injector.register('LevelFactory', LevelFactory);
            injector.register('TileFactory', TileFactory);
            injector.register('EntityTemplatesLoader', EntityTemplatesLoader);
            injector.register('EntityFactory', EntityFactory);
            injector.register('Game', Game);
            injector.register('Engine', Engine, true);
            injector.register('Logger', DebugLogger, true);
            injector.register('UI', UI);
            injector.register('Behaviors', function () {
                return Behaviors;
            }, true);

            injectLoader(behaviorsLoader);

            function injectLoader(loader) {
                var modules = loader.getAll();
                var moduleKeys = Object.keys(modules);
                for (var i = 0; i < moduleKeys.length; i++) {
                    var key = moduleKeys[i];
                    Behaviors.add(key, injector.inject(modules[key]));
                }
            }
        }
    }
)
;