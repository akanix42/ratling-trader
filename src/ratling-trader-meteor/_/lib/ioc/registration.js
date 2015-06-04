Ioc.Registration = Registration;

function Registration(key, value, lifecycle) {
    this.key = key;
    this.value = value;
    this.lifecycle = lifecycle;
    this.instantiator = value instanceof Function
        ? getInstantiator(value)
        : null;
}

Registration.prototype.instantiate = function instantiate(get, container) {
    return this.instantiator(this.value, get, container);
};

function getInstantiator(fn) {
    var args = _.map(fn.$inject || [], surroundWithGet).join(',');
    return new Function("fn", "container", "get",
        stringformat("return new fn({args});", {args: args})
    );
}

function surroundWithGet(value) {
    return stringformat("get(container, '{value}')", {value: value});
}