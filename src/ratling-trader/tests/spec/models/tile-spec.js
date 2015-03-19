define(function (require) {
    var iocLoader = require('ioc-loader');
    var when = require('when');
    var deferred = when.defer();

    loadRoots().then(function (loadedRoots) {
        var roots = loadedRoots;
        var tileFactory = roots.gameRoot.injector.resolve('tileFactory');
        var tile = tileFactory.create({baseArchitecture: {type: 'dirtFloor'}});
        var nullTile = tile = roots.gameRoot.injector.resolve('nullTile');

        setUpTileTests(tile);
        setUpNullTileTests(nullTile);
        deferred.resolve();
    });

    function loadRoots() {
        var roots = {};
        return iocLoader.init(function (gameRoot, uiRoot) {
            roots.gameRoot = gameRoot;
            roots.uiRoot = uiRoot;
        }).then(function (ui) {
            return roots;
        });

    }

    function setUpTileTests(tile) {
        describe('models - a tile', function () {
            testTile(tile);
        });
    }

    function setUpNullTileTests(tile) {
        describe('models - a null tile', function () {
            describe('models - a tile', function () {
                testTile(tile);
                testNullTile(tile);
            });
        });
    }

    function testTile(tile) {
        testTileEntities(tile.entities);
        testIntentHandlers(tile.intentHandlers);
        //get entities() {
        //    return this._private.entities;
        //},
        //get intentHandlers() {
        //    return this._private.intentHandlers;
        //},
        //get eventHandlers() {
        //    return this._private.eventHandlers;
        //},
        //get level() {
        //    return this._private.level;
        //},
        //get position() {
        //    return this._private.position;
        //},
        //getNeighbor: function getNeighbor(direction) {
        //    return this.level.getTileAt(this.position.x + (direction.x || 0), this.position.y + (direction.y || 0));
        //},

        function testTileEntities(entities) {
            describe('.entities', function () {
                it('add() - should return a boolean', function () {
                    entities.add({}).should.satisfy(function (x) {
                        return x === true || x === false;
                    });
                });
                it('all() - should return an array', function () {
                    Array.isArray(entities.all()).should.be.true();
                });
            });
        }

        function testIntentHandlers(intentHandlers) {
            describe('.intentHandlers', function () {

                it('add() - should exist', function () {
                    var result = intentHandlers.add(null, {class: {name: null}});
                    should.equal(result, undefined);
                });
                it('remove() - should exist', function () {
                    should.equal(intentHandlers.remove(null, {name: null}), undefined);
                });
                it('notify() - should return an array of objections', function () {
                    Array.isArray(intentHandlers.notify({constructor: {name: null}})).should.be.true();
                });

            });
        }
    }

    function testNullTile(tile) {
        //testNullTileEntities(tile.entities);
        testNullIntentHandlers(tile.intentHandlers);
        //get entities() {
        //    return this._private.entities;
        //},
        //get intentHandlers() {
        //    return this._private.intentHandlers;
        //},
        //get eventHandlers() {
        //    return this._private.eventHandlers;
        //},
        //get level() {
        //    return this._private.level;
        //},
        //get position() {
        //    return this._private.position;
        //},
        //getNeighbor: function getNeighbor(direction) {
        //    return this.level.getTileAt(this.position.x + (direction.x || 0), this.position.y + (direction.y || 0));
        //},

        function testTileEntities(entities) {
            describe('.entities', function () {
                it('add() - should return a boolean', function () {
                    entities.add({}).should.satisfy(function (x) {
                        return x === true || x === false;
                    });
                });
                it('all() - should return an array', function () {
                    Array.isArray(entities.all()).should.be.true();
                });
            });
        }

        function testNullIntentHandlers(intentHandlers) {
            describe('.intentHandlers', function () {
                it('notify() - should return an array with the nullTile as the sole objection', function () {
                    var result = intentHandlers.notify({constructor: {name: null}});
                    result[0].should.equal(tile);

                });

            });
        }
    }

    return deferred.promise;

});