/* global define */
define([
    // All your tests go here.
    //'spec/app.test'
    'ioc-loader',
    'spec/mixins/cell-to-cell-movement-spec.js',
    'spec/mixins/attacker-spec.js',
    'spec/maps/randomly-generated-maps-spec.js',
    'spec/game/new-game-spec.js',
    'spec/ui/new-game-spec.js',
    'spec/ui/loaded-game-spec',
    'spec/ui/game-interaction-spec',
    'promise!spec/models/tile-spec',
], function (iocLoader) {
    'use strict';
    var roots = {};
    iocLoader.init(function (gameRoot, uiRoot) {
        roots.gameRoot = gameRoot;
        roots.uiRoot = uiRoot;
    }).then(function () {
        window.console = window.console || function () {
        };
        window.notrack = true;
        window.mocha.run();
    });
});