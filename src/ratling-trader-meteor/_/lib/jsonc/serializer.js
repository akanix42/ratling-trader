"use strict";
JSONC.Serializer = Serializer;

function Serializer(data) {
    this.data = data;
    this.instancesMap = new Map();
    this.instances = [];
}

Serializer.prototype.serialize = function serializePublic() {
    return {
        instances: this.instances,
        root: map.call(this, this.data)
    };
};

Serializer.prototype.addInstance = function addInstancePublic(originalObject, instance) {
    if (this.instancesMap.get(originalObject))
        return;
    var reference = {$$index: this.instances.length};
    this.instances.push(instance);
    this.instancesMap.set(originalObject, reference);
    return reference;
};
Serializer.prototype.getInstance = function addInstancePublic(instance) {
    return this.instancesMap.get(instance);
};

function mapValues(obj) {
    var dto = _.mapValues(obj, mapValue, this);

    return dto;
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
        return convertGameObjectToDto.call(this, obj);

    return convertNativeObjectToDto.call(this, obj);
}

function convertGameObjectToDto(obj) {
    var reference = this.getInstance(obj);
    if (reference)
        return reference;

    var instance = {
        $$type: obj.constructor.typeName
    };

    reference = this.addInstance(obj, instance);

    var toDto = null;
    if ('toDto' in obj)
        toDto = obj.toDto();

    instance.$$value = map.call(this, toDto || obj);
    return reference;
}

function convertNativeObjectToDto(obj) {
    var reference = this.addInstance(obj, obj);
    if (obj instanceof Array)
        map.call(this, obj);
    return reference;
}

function isSerializableObject(obj) {
    if (obj === null || obj === undefined)
        return false;

    var constructor = obj.constructor;
    if ((constructor.typeName !== undefined && Classes.hasType(constructor)) || constructor === Object || constructor === Array)
        return true;

    return false;
}