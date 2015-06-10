"use strict";
var Container = Ioc.Container;

Container.prototype.decode = function decode(data) {
    var decodedData = JSONC.decode(data);
    this.lifecycles[Ioc.lifecycles.singleton] = decodedData.singletons;

    return decodedData.data;
};

Container.prototype.parse = function parse(data) {
    return this.decode(JSON.parse(data));
};