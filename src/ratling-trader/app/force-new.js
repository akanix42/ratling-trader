define(function () {
    forceNew.whenCalled = whenCalled;

    return forceNew;

    function forceNew(fn, args) {

        return new (Function.prototype.bind.apply(fn, args));
    }

    function whenCalled(fn) {
        var callForceNew = function () {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i)
                args[i] = arguments[i];

            args.unshift(null);

            return forceNew.call(undefined, fn, args);
        };
        callForceNew.constructor = fn;

        return callForceNew;
    }
});