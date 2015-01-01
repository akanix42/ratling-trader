require(['./require-config'], function () {
    require(['./composition-root', 'when'], function (CompositionRoot, when) {
        var compositionRoot = new CompositionRoot();
        when(compositionRoot.compositionPromise)
            .then(function () {
                var logger = compositionRoot.injector.resolve('logger');
                logger.logInfo('resolving game');
                var launcher = compositionRoot.injector.resolve('launcher');
                logger.logInfo('running game');
                launcher.run();
            });

    });
});