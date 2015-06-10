"use strict";
var Container = Ioc.Container;
Container.prototype.serialize = function serialize(data) {
    var singletons = this.lifecycles[Ioc.lifecycles.singleton];
    var serializer = new JSONC.Serializer({
        singletons: singletons,
        data: data
    });

    return serializer.serialize();
};