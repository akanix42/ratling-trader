define(function (require) {
    var Uuid = require('uuid'),
        inherit = require('helpers/inherit'),
        stringFormat = require('stringformat'),
        ROT = require('rot'),
        extend = require('lib/extend/extend');

    return Entity;

    function Entity(data, Mixins, Behaviors, logger) {
        var self = this,
            id = data.id || Uuid.v4(),
            abilities = {},
            currentState,
            mixins = {},
            states = {},
            entityBase = {};


        setPublicMethods();

        addMixins();
        addStates();
        setInitialState();

        function setPublicMethods() {
            entityBase.getLogger = getLogger;
            entityBase.getData = getData;
            entityBase.getState = getState;
            entityBase.getId = getId;
            entityBase.getType = getType;
            entityBase.getPosition = getPosition;
            entityBase.setPosition = setPosition;
            entityBase.getTile = getTile;
            entityBase.setTile = setTile;
            entityBase.getLevel = getLevel;
            entityBase.setLevel = setLevel;
            entityBase.getAbility = getAbility;
            entityBase.addAbility = addAbility;
            entityBase.kill = kill;
            entityBase.act = act;
            entityBase.hasMixin = hasMixin;
            entityBase.getEntityBase = getEntityBase;

            extend(self, entityBase);
        }

        function getEntityBase() {
            return entityBase;
        }

        function setInitialState() {
            currentState = getData().initialState;
        }

        function addMixins() {
            var mixins = self.getData().mixins;
            for (var i = 0; i < mixins.length; i++)
                addMixin(mixins[i]);
        }

        function addMixin(name) {
            if (!(name in Mixins)) {
                logger.logWarning(stringFormat('Invalid mixin: {name}', {name: name}));
                return;
            }
            inherit(Mixins[name], self, data);
            mixins[name] = true;
        }

        function hasMixin(name) {
            return name in mixins;
        }

        function getData() {
            return data;
        }

        function addStates() {
            extend(true, states, self.getData().states);
            var keys = Object.keys(states);
            for (var i = 0; i < keys.length; i++) {
                processBehaviors(states[keys[i]]);
            }
        }

        function processBehaviors(state) {
            for (var i = 0; i < state.behaviors.length; i++) {
                var behavior = state.behaviors[i];
                behavior.execute = Behaviors.get(behavior.name);
            }
        }

        function getState() {
            return states[currentState];
        }

        function addAbility(name, ability) {
            if (name in self)
                logger.logInfo(stringFormat('Replacing ability {name}', {name: name}));
            abilities[name] = ability;
        }

        function getId() {
            return id;
        }

        function getAbility(name) {
            return abilities[name];
        }

        function getType() {
            return data.type;
        }

        function getPosition() {
            return data.position;
        }

        function setPosition(x, y) {
            removeSelfFromCurrentTile();

            var newTile = getLevel().getMap().getTile(x, y);
            addSelfToTile(newTile);
        }

        function setTile(newTile) {
            removeSelfFromCurrentTile();
            addSelfToTile(newTile);
        }

        function addSelfToTile(tile) {
            data.position.x = tile.getPosition().x;
            data.position.y = tile.getPosition().y;

            tile.setCreature(self);
        }

        function getTile() {
            return getLevel().getMap().getTile(getPosition().x, getPosition().y);
        }

        function removeSelfFromCurrentTile() {
            var tile = getLevel().getMap().getTile(getPosition().x, getPosition().y);
            if (tile && tile.getCreature() === self)
                tile.setCreature(null);
        }

        function setLevel(level) {
            data.level = level;
            level.addEntity(self);
        }

        function getLevel() {
            return data.level;
        }

        function getLogger() {
            return logger;
        }


        function kill() {
            removeSelfFromCurrentTile();
            getLevel().removeEntity(self);
        }

        function act() {
            if (!self.hasAlreadyActed)
                decideOnAction();
            self.hasAlreadyActed = false;
        }

        function decideOnAction() {
            for (var i = 0; i < getState().behaviors.length; i++) {
                var behavior = getState().behaviors[i];
                if (behavior.probability >= ROT.RNG.getUniform()) {
                    if (self.hasAlreadyActed = performAction(behavior))
                        return;
                }
            }
            logger.log('do nothing');
        }

        function performAction(behavior) {
            behavior.execute(self);
        }
    }
});