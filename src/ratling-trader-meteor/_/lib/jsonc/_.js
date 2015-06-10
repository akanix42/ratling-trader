JSONC = new Jsonc();

function Jsonc() {
    this.registry = {};
    this.Decoder = null;
    this.Encoder = null;
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

Jsonc.prototype.stringify = function stringify(data) {
    return JSON.stringify(this.encode(data));
};

Jsonc.prototype.parse = function parse(json) {
    return this.decode(JSON.parse(json));
};

Jsonc.prototype.encode = function encode(data) {
    return new this.Encoder(data).encode();
};

Jsonc.prototype.decode = function decode(data) {
    return new this.Decoder(data).decode();
};