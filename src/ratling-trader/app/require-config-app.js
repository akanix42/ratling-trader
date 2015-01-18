(function () {
    'use strict';
    require.config({
        baseUrl: "app",
    });

    require(['require-config-shared'], function () {
        require(['main']);
    });
})();
