define(function () {
    forceNew.whenCalled = whenCalled;

    return forceNew;

    function forceNew(fn) {
        return new (Function.prototype.bind.apply(fn, arguments));
    }

    function whenCalled(fn) {
        return function () {
            return forceNew(fn);
        };
    }
});