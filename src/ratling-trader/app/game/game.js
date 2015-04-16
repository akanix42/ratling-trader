define(function (require) {
    var PlayerInitializedEvent = require('game/events/player-initialized-event');
    var GameInitializedEvent = require('game/events/game-initialized-event');
    var ReadyForPlayerInputEvent = require('game/events/ready-for-player-input-event');
    var FovUpdatedEvent = require('game/events/fov-updated-event');
    var EventPerceivedEvent = require('game/events/event-perceived-event');
    var when = require('when');
    var GameCommands = require('enums/commands');
    var MoveCommand = require('game/commands/move-command');
    //var gameActions = getActions();

    function Game(gameToUiBridge, levelFactory, entityFactory, gameData, gameEventHub, scheduler) {
        var self = this;
        self._private = {
            player: null,
            gameToUiBridge: gameToUiBridge,
            scheduler: scheduler
        };

        var deferredsMap = notifyWhenInitialized(self, gameEventHub);
        getPlayer(self, gameEventHub, gameToUiBridge, deferredsMap);

        var level = self._private.level = gameData
            ? levelFactory.create(gameData.levels[gameData.currentLevel])
            : levelFactory.create();
    }

    Game.prototype = {
        get level() {
            return this._private.level;
        },
        get player() {
            return this._private.player;
        },
        handleInput: function handleInput(input) {
            var command = input;//gameActions[input];
            if (!command) return;

            var wasHandled = this._private.player.commandHandlers.notify(command);
            if (wasHandled)
                this._private.scheduler.resume();
            else
                this._private.gameToUiBridge.readyForPlayerInput.call(this._private.gameToUiBridge);

        }


    };

    return Game;


    function getPlayer(game, gameEventHub, gameToUiBridge, deferredsMap) {
        gameEventHub.subscribe(null, {
            class: PlayerInitializedEvent, handler: function (event) {
                game._private.player = event.player;
                game._private.scheduler.resume();
                deferredsMap.get(PlayerInitializedEvent.name).resolve();
            }
        });
        gameEventHub.subscribe(null, {
            class: FovUpdatedEvent, handler: function (event) {
                gameToUiBridge.sendEvent(event);
            }
        });
        gameEventHub.subscribe(null, {
            class: EventPerceivedEvent, handler: function (event) {
                gameToUiBridge.sendEvent(event);
            }
        });

        gameEventHub.subscribe(null, {
            class: ReadyForPlayerInputEvent, handler: function (event) {
                when(game._private.gameToUiBridge.readyForPlayerInput.call(game._private.gameToUiBridge))
                    .then(game.handleInput.bind(game));
            }
        });
    }

    function movePlayerOrCursor(command, action) {
        var wasSuccessful = player.perform(moveCommand({x: action.data.x || 0, y: action.data.y || 0}));
        player.eventHub.broadcast(performedCommandEvent(command, wasSuccessful));

        //player.eventHub.broadcast('performAction', 'move', action.data.x || 0, action.data.y || 0);
        lockCursorToPlayer();
        updateUI();
    }

    //function getActions() {
    //    var actions = {};
    //    actions[GameCommands.GoLeft] = new MoveCommand({x: -1});
    //    actions[GameCommands.GoRight] = new MoveCommand({x: 1});
    //    actions[GameCommands.GoUp] = new MoveCommand({y: -1});
    //    actions[GameCommands.GoDown] = new MoveCommand({y: 1});
    //    actions[GameCommands.GoUpLeft] = new MoveCommand({x: -1, y: -1});
    //    actions[GameCommands.GoUpRight] = new MoveCommand({x: 1, y: -1});
    //    actions[GameCommands.GoDownRight] = new MoveCommand({x: 1, y: 1});
    //    actions[GameCommands.GoDownLeft] = new MoveCommand({x: -1, y: 1});
    //    actions[GameCommands.WaitInPlace] = new MoveCommand({x: 0, y: 0});
    //    return actions;
    //}

    function notifyWhenInitialized(game, gameEventHub) {
        var deferreds = [];
        var deferredsMap = new Map();

        addDeferred(PlayerInitializedEvent.name);

        when.all(deferreds)
            .then(function () {
                gameEventHub.notify(new GameInitializedEvent(game));
            });

        return deferredsMap;

        function addDeferred(name) {
            deferredsMap.set(name, when.defer());
            deferreds.push(deferredsMap.get(name).promise);

        }
    }
});