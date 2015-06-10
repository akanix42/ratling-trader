JSONC = new Jsonc();

function Jsonc() {
    this.registry = {};
}

Jsonc.prototype.register = function register(type) {
    if (!type.typeName) {
        console.error("Error registering type: no typename specified!");
        return;
    }
    if (this.hasType(type.typeName)) {
        console.error(stringformat("Error registering type: {typeName} is already registered!", type));
        return;
    }

    this.registry[type.typeName] = type;
};

Jsonc.prototype.hasType = function hasType(type) {
    return this.hasTypeName(type.typeName);
};

Jsonc.prototype.hasTypeName = function hasType(typeName) {
    return typeName in this.registry;
};

