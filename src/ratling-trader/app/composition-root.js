define(function (require) {
    var when = require('when'),
        Injector = require('injector'),
        PlayingScreenFactory = require('ui/screens/playing-screen-factory'),
        LosingScreenFactory = require('ui/screens/losing-screen-factory'),
        WinningScreenFactory = require('ui/screens/winning-screen-factory'),
        MapFactory = require('game/map/map-factory'),
        LevelFactory = require('game/levels/level-factory'),
//        MonsterFactory = require('game/entities/monster-factory'),
        TileFactory = require('game/tiles/tile-factory'),
//        PlayerFactory = require('game/entities/player-factory'),
        EntityFactory = require('game/entities/entity-factory'),
        Game = require('game'),
        Engine = require('game/engine'),
        UI = require('ui/ui'),
        AsciiTiles = require('ui/tiles/ascii-tiles'),
        DebugLogger = require('debug-logger'),
        Abilities = require('enums/abilities'),
        EntityTypes = require('game/entities/entity-types'),
        abilityList = require('config/ability-list');

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
//        injector.register('MonsterFactory', MonsterFactory);
//        injector.register('PlayerFactory', PlayerFactory);
        injector.register('EntityFactory', EntityFactory);
        injector.register('Game', Game);
        injector.register('EntityTypes', EntityTypes, true);
        injector.register('Engine', Engine, true);
        injector.register('Logger', DebugLogger, true);
        injector.register('UI', UI);
        injector.register('Abilities', Abilities, true);

        self.compositionPromise = when(registerAbilities());


        function registerAbilities() {
            Abilities = injector.resolve('Abilities');
            return when.map(abilityList, addAbility);
        }

        function addAbility(ability) {
            var deferred = when.defer();
            require([ability.path], function (abilityModule) {
                var registeredName = ability.name + 'Ability';
                injector.register(registeredName, abilityModule, true);
                Abilities.register(ability.name, injector.resolve(registeredName));
                deferred.resolve();
            });
            return deferred.promise;
        }
    }


});