define(function () {
    return {
        inheritPrototype: inheritPrototype

    };

    function inheritPrototype(heir, predecessor) {
        heir.prototype = Object.create(predecessor.prototype);
        heir.prototype.constructor = heir;
    }
});