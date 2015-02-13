define(function (require) {
        'use strict';
        var when = require('when');
        var CompositionRoot = require('composition-root');
        var rat = require('game/global');
        var Logger = require('logger');
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
                self.registerModule('game/game-to-ui-bridge'),
                self.registerModule('game/game-factory'),
                self.registerModule('game/saved-game-factory'),
                self.registerModule('game/tiles/tile'),
                self.registerModule('game/tiles/tile-factory'),
                self.registerModule('game/entities/entity-factory'),
                self.registerModule('game/levels/level-factory'),
                self.registerModule('game/mixins/mixin-map-factory'),
                self.registerModule('game/intents/intent-handlers-factory'),
                self.registerModule('game/events/event-handlers-factory'),
                self.registerModule('game/maps/random-map-generator'),

                self.registerObject('nullTile', function () {
                    return new NullTile();
                }),
                self.registerObject('gameEventHub', function (eventHandlersFactory) {
                    return eventHandlersFactory.create();
                }),
            ]);
        };
        return GameRoot;
    }
)
;