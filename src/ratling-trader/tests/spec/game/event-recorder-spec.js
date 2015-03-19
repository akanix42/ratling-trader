define(function (require) {
    var iocLoader = require('ioc-loader');

    describe('game - event recorder', function () {
        it('should record every event fired', function (done) {
            var roots = {};
            iocLoader.init(function (gameRoot, uiRoot) {
                roots.gameRoot = gameRoot;
                roots.uiRoot = uiRoot;
            }).then(function () {
                var start = new Date();
                var eventRecorder = roots.gameRoot.injector.resolve('eventRecorder');
                var eventHandlers = roots.gameRoot.injector.resolve('eventHandlersFactory').create();
                eventRecorder._private.events.should.be.empty();
                eventHandlers.notify(new TestEvent());
                eventHandlers.notify(new TestEvent());
                eventRecorder._private.events.length.should.equal(2);
                done(start);
            });

            function TestEvent() {
            }
        });
    });
});