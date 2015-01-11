define(function (require) {
    return ScreenFactory;

    function ScreenFactory(injector) {
        var self = this;
        self.get = function get(name) {
            return injector.resolve(name);
        };
    }
});