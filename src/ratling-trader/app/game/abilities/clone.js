define(function (require) {

    return Constructor;

    function Constructor(monsterFactory) {
        var self = this;

        self.execute = execute;

        function execute(creature, ability) {
            var clone = {
                type: creature.getType(),
                position: {x: creature.getPosition().x, y: creature.getPosition().y - 1}
            };
            clone = monsterFactory.get(clone);
            clone.setLevel(creature.getLevel());
            clone.setPosition(clone.getPosition().x, clone.getPosition().y);
            creature.getLevel().addEntity(clone);
        }
    }
});