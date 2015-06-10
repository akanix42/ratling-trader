"use strict";
JSONC.Encoder = Encoder;

function Encoder(data) {
    this.data = data;
    this.instancesMap = new Map();
    this.instances = [];
}

Encoder.prototype.encode = function encodePublic() {
    return {
        instances: this.instances,
        root: map.call(this, this.data)
    };
};

function addInstance(originalObject, instance) {
    if (this.instancesMap.get(originalObject))
        return;
    var reference = {$$index: this.instances.length};
    this.instances.push(instance);
    this.instancesMap.set(originalObject, reference);
    return reference;
}

function getInstance(instance) {
    return this.instancesMap.get(instance);
}

function map(obj) {
    if (obj instanceof Array)
        return _.map(obj, mapValue, this);
    else
        return _.mapValues(obj, mapValue, this);

}
function mapValue(value) {
    var typeCategory = getTypeCategory(value);
    if (typeCategory === "primitive")
        return value;
    if (typeCategory === "object")
        return mapObject.call(this, value);
}


function getTypeCategory(value) {
    var type = typeof value;
    if (type === "function" || (value !== null && type === "object"))
        return type;
    return "primitive";
}

function mapObject(obj) {
    if (!isSerializableObject(obj)) {
        console.warn(obj + ' is not a serializable object and will NOT be recorded!');
        return null;
    }

    if (obj.constructor.typeName)
        return convertRegisteredTypeToDto.call(this, obj);

    if (obj.constructor === Object)
        return convertPlainObjectToDto.call(this, obj);

    return convertNativeTypeToDto.call(this, obj);
}

function convertRegisteredTypeToDto(obj) {
    var reference = getInstance.call(this, obj);
    if (reference)
        return reference;

    var instance = {
        $$type: obj.constructor.typeName
    };

    reference = addInstance.call(this, obj, instance);

    var toDto = null;
    if ('toDto' in obj)
        toDto = obj.toDto();

    instance.$$value = map.call(this, toDto || obj);
    return reference;
}

function convertPlainObjectToDto(obj) {
    var reference = getInstance.call(this, obj);
    if (reference)
        return reference;

    var instance = {
        $$type: "$$object"
    };
    reference = addInstance.call(this, obj, instance);

    instance.$$value = map.call(this, obj);

    return reference;
}

function convertNativeTypeToDto(obj) {
    var reference = getInstance.call(this, obj);
    if (reference)
        return reference;

    var instance = {
        $$type: "$$array"
    };
    reference = addInstance.call(this, obj, instance);

    instance.$$value = map.call(this, obj);

    return reference;
}

function isSerializableObject(obj) {
    if (obj === null || obj === undefined)
        return false;

    var constructor = obj.constructor;
    if ((constructor.typeName !== undefined && JSONC.hasType(constructor)) || constructor === Object || constructor === Array)
        return true;

    return false;
}