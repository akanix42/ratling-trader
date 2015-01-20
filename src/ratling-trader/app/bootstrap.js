require(['require-config'], function () {
    require(['ui-compatibility-check'], function (isCompatible) {
        if (isCompatible)
            require(['main'], function () {

            });
    });
});
