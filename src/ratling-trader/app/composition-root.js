define(function (require) {
        var when = require('when'),

            Injector = require('injector'),
            Logger = require('logger'),
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
            MixinFactory = require('game/mixins/mixin-factory'),
            TileFactory = require('game/tiles/tile-factory'),

        // Maps
            MapGenerator = require('game/map/map-generator'),

        // UI
            UI = require('ui/ui'),
            ScreenManager = require('ui/screen-manager'),
            AsciiLoader = require('promise!ui/loaders/ascii-loader'),
            AsciiTiles = require('ui/tiles/ascii-tiles'),

        // UI Factories
            DisplayFactory = require('ui/display-factory'),
            ScreenFactory = require('ui/screens/screen-factory'),

        // Screens
            LosingScreen = require('ui/screens/losing-screen'),
            PlayingScreen = require('ui/screens/playing-screen'),
            WinningScreen = require('ui/screens/winning-screen')
            ;

        return CompositionRoot;

        function CompositionRoot() {
            var self = this;
            var injector = self.injector = new Injector();

            injector.register('Injector', injector);
            // ---- Game
            injector.register('Stopwatch', Stopwatch);
            injector.register('Logger', Logger, true);

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
            injector.register('MixinFactory', MixinFactory);
            injector.register('TileFactory', TileFactory);
            injector.register('MapGenerator', MapGenerator);
            // ====

            // ---- UI
            injector.register('UI', UI);
            injector.register('ScreenManager', ScreenManager);
            injector.register('AsciiTiles', AsciiTiles, true);
            injector.register('AsciiLoader', AsciiLoader, true);
            injector.register('DisplayFactory', DisplayFactory);

            injector.register('Display', function (displayFactory) {
                return displayFactory.get();
            }, true);

            injector.register('ScreenFactory', ScreenFactory);

            injector.register('LosingScreen', LosingScreen);
            injector.register('PlayingScreen', PlayingScreen);
            injector.register('WinningScreen', WinningScreen);

            // ====

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