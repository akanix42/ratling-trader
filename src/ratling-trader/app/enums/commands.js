define(function (require) {
    var MoveCommand = require('game/commands/move-command');

    var i = 1;
    return {
        GoLeft: new MoveCommand({x: -1}),
        GoRight: new MoveCommand({x: 1}),
        GoUp: new MoveCommand({y: -1}),
        GoDown: new MoveCommand({y: 1}),
        GoUpLeft: new MoveCommand({x: -1, y: -1}),
        GoUpRight: new MoveCommand({x: 1, y: -1}),
        GoDownRight: new MoveCommand({x: 1, y: 1}),
        GoDownLeft: new MoveCommand({x: -1, y: 1}),
        WaitInPlace: new MoveCommand({x: 0, y: 0}),
    };

});