define(function (require) {
        'use strict';
        var when = require('when');
        var CompositionRoot = require('composition-root');
        var rat = require('game/global');
        var Logger = require('logger');
        //var Stopwatch = require('helpers/stopwatch');

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
                self.registerModule('game/tiles/tile-factory'),
                self.registerModule('game/entities/entity-factory'),
                self.registerModule('game/levels/level-factory'),
                self.registerModule('game/mixins/mixin-map-factory'),
                self.registerModule('game/intents/intent-handlers-factory'),
                //self.registerModule(''),
            ]);
        };
        return GameRoot;
    }
)
;