/* global define */
define([
    // All your tests go here.
    //'spec/app.test'
    'spec/movement/cell-to-cell-movement-spec.js',
    'spec/maps/randomly-generated-maps-spec.js',
    'spec/game/new-game-spec.js',
    'spec/ui/new-game-spec.js',
], function () {
    'use strict';

    window.console = window.console || function () {
    };
    window.notrack = true;
    window.mocha.run();
});