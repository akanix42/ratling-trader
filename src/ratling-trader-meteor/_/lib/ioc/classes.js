Classes = new _Classes();

function _Classes() {
    this.registry = {};
}

_Classes.prototype.register = function register(type) {
    if (!type.typeName) {
        console.error("Error registering class: no typename specified!");
        return;
    }
    if (this.hasType(type.typeName)){
        console.error(stringformat("Error registering class: {typeName} is already registered!", type));
        return;
    }

    this.registry[type.typeName] = type;
};

_Classes.prototype.hasType = function hasType(type){
    return type.typeName in this.registry;
};
