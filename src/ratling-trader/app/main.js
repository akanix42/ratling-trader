require(['./require-config'], function () {
    require(['./composition-root'], function (CompositionRoot) {
        var compositionRoot = new CompositionRoot();
        var game = compositionRoot.injector.resolve('Game');
        game.run();
    });
});