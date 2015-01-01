define(function (require) {
        var when = require('when'),

            Injector = require('injector'),
            DebugLogger = require('debug-logger'),
            Stopwatch = require('helpers/stopwatch'),

        // Game
            Launcher = require('launcher'),
            Game = require('game/game'),
            Scheduler = require('game/scheduler'),
            EntityAttributes = require('game/entities/entity-attributes'),

        // Loaders
            EntityTemplatesLoader = require('game/loaders/entity-templates-loader'),
            behaviorsLoader = require('promise!game/loaders/behavior-modules-loader'),
            mixinsLoader = require('promise!game/loaders/mixin-modules-loader'),

        // Game Factories
            AttributeFactory = require('game/entities/attribute-factory'),
            EntityAttributesFactory = require('game/entities/entity-attributes-factory'),
            EntityFactory = require('game/entities/entity-factory'),
            EntityPositionFactory = require('game/entities/entity-position-factory'),
            LevelFactory = require('game/levels/level-factory'),
            TileFactory = require('game/tiles/tile-factory'),

        // Maps
            MapGenerator = require('game/map/map-generator'),

        // UI
            UI = require('ui/ui'),
            AsciiLoader = require('promise!ui/loaders/ascii-loader'),
            AsciiTiles = require('ui/tiles/ascii-tiles'),
            LosingScreenFactory = require('ui/screens/losing-screen-factory'),
            PlayingScreenFactory = require('ui/screens/playing-screen-factory'),
            WinningScreenFactory = require('ui/screens/winning-screen-factory')
            ;

        return CompositionRoot;

        function CompositionRoot() {
            var self = this;
            var injector = self.injector = new Injector();

            injector.register('Stopwatch', Stopwatch);
            injector.register('Logger', DebugLogger, true);

            injector.register('Launcher', Launcher);
            injector.register('Game', Game, true);
            injector.register('scheduler', Scheduler, true);
            injector.register('EntityTemplatesLoader', EntityTemplatesLoader, true);
            injector.register('EntityAttributes', EntityAttributes);

            injector.register('AttributeFactory', AttributeFactory);
            injector.register('EntityAttributesFactory', EntityAttributesFactory);
            injector.register('EntityFactory', EntityFactory);
            injector.register('EntityPositionFactory', EntityPositionFactory);
            injector.register('LevelFactory', LevelFactory);
            injector.register('TileFactory', TileFactory);

            injector.register('MapGenerator', MapGenerator);

            injector.register('UI', UI);
            injector.register('AsciiTiles', AsciiTiles, true);
            injector.register('AsciiLoader', AsciiLoader, true);
            injector.register('LosingScreenFactory', LosingScreenFactory);
            injector.register('PlayingScreenFactory', PlayingScreenFactory);
            injector.register('WinningScreenFactory', WinningScreenFactory);

            injector.register('loadedBehaviors', function () {
                return behaviorsLoader;
            }, true);
            injector.register('loadedMixins', function () {
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