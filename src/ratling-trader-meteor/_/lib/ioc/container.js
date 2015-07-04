'use strict';

Ioc.Container = Container;

function Container() {
    this.registry = {};
    var lifecycles = this.lifecycles = {};
    lifecycles[Ioc.lifecycles.singleton] = {};
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
        var registration = this.registry[key] = new Ioc.Registration(key, value, lifecycle || Ioc.lifecycles.unique);
        if (!this.registry[key + "Factory"])
            this.registry[key + "Factory"] = new Ioc.FactoryRegistration(this, registration, resolve);
    },
    serialize: function serialize(obj) {
        return new Ioc.Serializer(obj).serialize();
    }
};

function get(container, key) {
    var registration = container.registry[key];
    //
    //if (registration === undefined) {
    //    var facility = getFacility(container, key);
    //    return facility.handle(container, key, registration);
    //}
    return resolve(container, key, registration);

}

function resolve(container, key, registration) {
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
    if (instance = container.lifecycles[registration.lifecycle][key])
        return instance;

    instance = getInstance(container, registration);
    container.lifecycles[registration.lifecycle][key] = instance;

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

