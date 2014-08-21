define(function (require) {

    return Actor;

    function Actor(data) {
        var self = this,
            behaviors = [];

        self.getData = getData;
        self.addBehavior = addBehavior;
        self.getBehaviors = getBehaviors;

        function getData() {
            return data;
        }

        function addBehavior(name, behavior) {
            behaviors.push({name: name, execute: behavior});
        }

        function getBehaviors() {
            return behaviors;
        }


    }
});