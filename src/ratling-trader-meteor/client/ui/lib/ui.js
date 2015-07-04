Ui = {};
(function () {
    "use strict";
    Ui.container = Ioc.create();

    Ui.registerUnique = function (typeName, type) {
        type.typeName = typeName;
        Ui.container.register(typeName, type, Ioc.lifecycles.unique);
    };

    Ui.registerSingleton = function (typeName, type) {
        type.typeName = typeName;
        Ui.container.register(typeName, type, Ioc.lifecycles.singleton);
    };

    Ui.registerSingleton("iocContainer", Ui.container);
})();