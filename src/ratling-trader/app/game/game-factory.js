define(function (require) {
    'use strict';
    var Game = require('game/game');

    function GameFactory(injector, levelFactory, entityFactory, gameEventHub, scheduler, commandHandlers, gameEntities) {
        this._ = {
            levelFactory: levelFactory,
            entityFactory: entityFactory,
            commandHandlersFactory: commandHandlers,
            gameEventHub: gameEventHub,
            scheduler: scheduler,
            gameEntities: gameEntities,
            injector:injector
        };
    }

    GameFactory.prototype = {
        create: function create(gameToUiBridge) {
            var game = this._.injector.resolve('game');
            game.init();
            var playerData = {type: 'player', tile: game.level.getRandomTile()};
            playerData.tile.entities.add(this._.entityFactory.create(playerData));
            return game;
        }
    };

    return GameFactory;
});