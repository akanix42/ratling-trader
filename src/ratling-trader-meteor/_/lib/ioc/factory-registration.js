"use strict";
Ioc.FactoryRegistration = FactoryRegistration;

function FactoryRegistration(container, registration, resolve) {
    this.value = new Factory(container, registration, resolve);
}

function Factory(container, registration, resolve){
    this.container = container;
    this.registration = registration;
    this.resolve = resolve;
}

Factory.prototype.get = function get() {
    return this.resolve(this.container, this.registration.key, this.registration);
};
