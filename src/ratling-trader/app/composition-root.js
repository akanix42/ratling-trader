define(function (require) {
        var when = require('when'),

            Injector = require('injector'),
            DebugLogger = require('debug-logger'),

            // Game
            Game = require('game'),
            Engine = require('game/engine'),

            // Loaders
            EntityTemplatesLoader = require('game/loaders/entity-templates-loader'),
            behaviorsLoader = require('promise!game/loaders/behavior-modules-loader'),
            mixinsLoader = require('promise!game/loaders/mixin-modules-loader'),

            // Game Factories
            MapFactory = require('game/map/map-factory'),
            LevelFactory = require('game/levels/level-factory'),
            TileFactory = require('game/tiles/tile-factory'),
            EntityFactory = require('game/entities/entity-factory'),

            // UI
            UI = require('ui/ui'),
            AsciiTiles = require('ui/tiles/ascii-tiles'),
            LosingScreenFactory = require('ui/screens/losing-screen-factory'),
            PlayingScreenFactory = require('ui/screens/playing-screen-factory'),
            WinningScreenFactory = require('ui/screens/winning-screen-factory')
            ;

        return CompositionRoot;

        function CompositionRoot() {
            var self = this;
            var injector = self.injector = new Injector();

            injector.register('Logger', DebugLogger, true);

            injector.register('Game', Game);
            injector.register('Engine', Engine, true);
            injector.register('EntityTemplatesLoader', EntityTemplatesLoader, true);

            injector.register('EntityFactory', EntityFactory);
            injector.register('LevelFactory', LevelFactory);
            injector.register('MapFactory', MapFactory);
            injector.register('TileFactory', TileFactory);

            injector.register('UI', UI);
            injector.register('AsciiTiles', AsciiTiles, true);
            injector.register('LosingScreenFactory', LosingScreenFactory);
            injector.register('PlayingScreenFactory', PlayingScreenFactory);
            injector.register('WinningScreenFactory', WinningScreenFactory);

            injector.register('Behaviors', function () {
                return behaviorsLoader;
            }, true);
            injector.register('Mixins', function () {
                return mixinsLoader;
            }, true);

            injectLoader(behaviorsLoader);
            injectLoader(mixinsLoader);

            function injectLoader(loader) {
                var modules = loader.getModules();
                var moduleKeys = Object.keys(modules);
                for (var i = 0; i < moduleKeys.length; i++) {
                    var key = moduleKeys[i];
                    loader.addModuleInstance(key, injector.inject(modules[key]));
                }
            }
        }
    }
)
;