"use strict";
var Container = Ioc.Container;

Container.prototype.encode = function encode(data) {
    var singletons = this.lifecycles[Ioc.lifecycles.singleton];
    return JSONC.encode({
        singletons: singletons,
        data: data
    });
};

Container.prototype.stringify = function stringify(data) {
    return JSON.stringify(this.encode(data));
};