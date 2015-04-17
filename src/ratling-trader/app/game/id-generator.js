define(function () {
    function IdGenerator() {
        this._ = {ids: {}};
    }

    IdGenerator.prototype.getNextId = function getNextId(type) {
        var ids = this._.ids;
        return type in ids
            ? ids[type]++
            : ids[type] = 1;
    };

    IdGenerator.prototype.toDto = function toDto() {
        return this._.ids;
    };

    return IdGenerator;
});
