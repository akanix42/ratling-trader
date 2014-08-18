require(['./require-config'], function () {
    require(['./composition-root','when'], function (CompositionRoot, when) {
        var compositionRoot = new CompositionRoot();
        when(compositionRoot.compositionPromise)
            .then(function () {
                var game = compositionRoot.injector.resolve('Game');
                game.run();
            });

    });
});