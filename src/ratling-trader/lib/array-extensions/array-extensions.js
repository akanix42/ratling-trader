define(function () {
    Array.prototype.last = function (filterOrIndex) {
        var index = 1;

        if (typeof filterOrIndex === 'function')
            return reverseFilter(this, filter);
        else if (Number.isInteger(filterOrIndex))
            index = filterOrIndex;

        return this[this.length - index];
    };

    function reverseFilter(array, filter) {
        for (var i = array.length - 1; array >= 0; i--) {
            var item = array[i];
            if (filter(item))
                return item;
        }
    }
});