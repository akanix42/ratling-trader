"use strict";
JSONC.Decoder = Decoder;

function Decoder(data) {
    this.data = data;
    this.instances = null;
}

Decoder.prototype.decode = function decodePublic() {
    this.instances = map.call(this, this.data.instances, instantiateValue);

    _.forEach(this.instances, restoreProperties, this);
    restoreProperties.call(this, this.data.root, restoreProperties);

    return this.data.root;
};

function map(obj, fn) {
    if (obj instanceof Array)
        return _.map(obj, fn, this);
    else
        return _.mapValues(obj, fn, this);
}

function instantiateValue(value) {
    var typeCategory = getTypeCategory(value);
    if (typeCategory === "function")
        return undefined;

    if (typeCategory === "primitive")
        return value;

    if (isRegisteredType(value))
        return instantiateRegisteredType.call(this, value);

    if (isNativeType(value))
        return instantiateNativeType.call(this, value);

    return value;
}

function getTypeCategory(value) {
    var type = typeof value;
    if (type === "function" || (value !== null && type === "object"))
        return type;
    return "primitive";
}

function isRegisteredType(obj) {
    return "$$type" in obj && obj.$$type && JSONC.hasTypeName(obj.$$type);
}

function isNativeType(obj) {
    return "$$type" in obj && (obj.$$type === "$$object" || obj.$$type === "$$array");
}

function instantiateRegisteredType(obj) {
    var instance = new JSONC.registry[obj.$$type]();
    return _.assign(instance, obj.$$value);
}

function instantiateNativeType(obj) {
    var instance = obj.$$type === "$$object"
        ? {}
        : [];
    return _.assign(instance, obj.$$value);
}

function restoreProperties(obj) {
    var typeCategory = getTypeCategory(obj);
    if (typeCategory !== "object")
        return;

    _.forOwn(obj, restoreProperty, this);
}

function restoreProperty(value, key, obj) {
    var typeCategory = getTypeCategory(value);
    if (typeCategory !== "object")
        return;

    if (isReference(value))
        obj[key] = this.instances[value.$$index];
}

function isReference(obj) {
    return "$$index" in obj;
}