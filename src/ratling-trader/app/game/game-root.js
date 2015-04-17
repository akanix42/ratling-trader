define(function (require) {
        'use strict';
        var when = require('when');
        var CompositionRoot = require('composition-root');
        var rat = require('game/global');
        var Logger = require('memory-logger');
        //var Stopwatch = require('helpers/stopwatch');

        var NullTile = require('game/tiles/null-tile');

        // Game
        var Game = require('game/game');

        function GameRoot() {
            CompositionRoot.call(this);
        }

        GameRoot.prototype = Object.create(CompositionRoot.prototype);

        GameRoot.prototype.init = function init() {
            var self = this;
            rat.logger = self._private.injector.inject(Logger);
            return when.all([
                self.registerModule('game/game-to-ui-bridge', {isSingleton: true}),
                self.registerModule('game/game'),
                self.registerModule('game/game-factory'),
                self.registerModule('game/id-generator', {isSingleton: true}),
                self.registerModule('game/saved-game-factory'),
                self.registerModule('game/tiles/tile'),
                self.registerModule('game/tiles/tile-factory'),
                self.registerModule('game/tiles/tile-entities'),
                self.registerModule('game/entities/entity-factory'),
                self.registerModule('game/entities/entity-inventory'),
                self.registerModule('game/entities/entity-attributes'),
                self.registerModule('game/entities/entity-attribute', {
                    factory: function create(data) {
                        return new this.loadedModule(data);
                    }
                }),
                self.registerModule('game/scheduler', {isSingleton: true}),
                self.registerModule('game/entities/game-entities', {isSingleton: true}),
                self.registerModule('helpers/stopwatch'),
                self.registerModule('game/state-machine'),
                self.registerModule('game/levels/level-factory'),
                self.registerModule('game/mixins/mixin-map-factory'),
                self.registerModule('game/intents/intent-handlers'),
                self.registerModule('game/commands/command-handlers'),
                self.registerModule('game/events/event-handlers'),
                self.registerModule('game/event-recorder', {isSingleton: true}),
                self.registerModule('game/maps/random-map-generator'),
                self.registerModule('game/loaders/behavior-modules-loader', {isSingleton: true}),
                self.registerModule('game/loaders/mixin-modules-loader', {isSingleton: true}),
                self.registerModule('game/intents/null-intent-handlers-factory', {isSingleton: true}),
                self.registerModule('game/loaders/entity-templates-loader', {isSingleton: true}),

                self.registerObject('nullTile', function () {
                    return self._private.injector.inject(NullTile);
                }),

                self.registerObject('gameEventHub', function (eventHandlers) {
                    return eventHandlers;
                }),

            ]).then(function () {
                return when.all([
                    self.loadAsyncSingleton('loadedMixins'),
                    self.loadAsyncSingleton('loadedBehaviors'),
                    //self.loadAsyncSingleton('entityTemplatesLoader'),
                ]);
            });
        };
        return GameRoot;
    }
)
;