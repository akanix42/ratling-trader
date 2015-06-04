'use strict';

Ioc.Container = Container;

function Container() {
    this.registry = {};
    var lifecycles = this.lifecycles = {};
    lifecycles[Ioc.lifecycles.singleton] = new Map();
}

var factoryFacility = {
    suffixes: ["Factory", "!"],

    resolve: function (container, key) {
        return {
            handled: true,
            data: new factory(container, key)
        }
    }
};

Container.prototype = {
    facilities: {
        factory: factoryFacility
    },

    get: function publicGet(key) {
        return get(this, key);
    },
    register: function register(key, value, lifecycle) {
        this.registry[key] = new Ioc.Registration(key, value, lifecycle || Ioc.lifecycles.unique);
    }
};


function get(container, key) {
    var registration = container.registry[key];

    if (registration === undefined) {
        var facility = getFacility(container, key);
        return facility.handle(container, key, registration);
    }

    if (!registration)
        throw new Error("Registration not found for: " + key);

    if (!(registration.value instanceof Function))
        return registration.value;

    if (registration.lifecycle === Ioc.lifecycles.singleton)
        return getSingleton(container, key, registration);

    return getInstance(container, registration);
}

function getInstance(container, registration) {
    return registration.instantiate(container, get);
}

function getSingleton(container, key, registration) {
    var instance;
    if (instance = container.lifecycles[registration.lifecycle].get(key))
        return instance;

    instance = getInstance(container, registration);
    container.lifecycles[registration.lifecycle].set(key, instance);

    return instance;
}

function getFacility(container, key) {
    for (var facilityName in container.facilities) {
        var facility = container.facilities[facilityName];
        for (var t = 0, len = facility.suffixes.length; t < len; t++) {
            var suffix = facility.suffixes[t];
            if (key.indexOf(suffix, key.length - suffix.length) !== -1) {
                return {
                    data: facility,
                    key: key.slice(0, key.length - suffix.length)
                };
            }
        }
    }

    return {
        data: null,
        key: key
    };
}

