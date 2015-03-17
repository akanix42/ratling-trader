/* global define */
define([
    // All your tests go here.
    //'spec/app.test'
    'ioc-loader',
], function (iocLoader) {
    'use strict';
    var specs = {
        mixins: [
            'spec/mixins/attacker-spec.js',
            'spec/mixins/cell-to-cell-movement-spec.js',
        ],
        models: [
            'spec/models/entity-attribute-spec',
            'spec/models/entity-spec',
            'promise!spec/models/tile-spec',
        ],
        maps: [
            'spec/maps/randomly-generated-maps-spec.js',
        ],
        game: [
            'spec/game/new-game-spec.js',
        ],
        ui: [
            'spec/ui/new-game-spec.js',
            'spec/ui/loaded-game-spec',
            'spec/ui/game-interaction-spec',
        ]
    };
    var allTests = ['mixins', 'models', 'maps', 'game', 'ui'];
    var qs = queryString.parse(location.search);
    var selectedTests = qs.suite ? [qs.suite] : allTests;
    var reqArray = [];
    for (var i = 0; i < selectedTests.length; i++)
        reqArray = reqArray.concat(specs[selectedTests[i]]);

    require(reqArray, function () {
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
});