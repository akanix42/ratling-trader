define(function (require) {
    var when = require('when');

    var abilities = {};

    return Constructor;

    function Constructor() {
        var self = this;
        self.get = get;
        self.register = register;
        self.abilities = abilities;
    }

    function get(name) {
        return abilities[name];
    }

    function register(name, ability) {
        abilities[name] = ability;
    }

});