define(function (require) {
    var Uuid = require('uuid'),
        inherit = require('helpers/inherit'),
        stringFormat = require('stringformat'),
        ROT = require('rot'),
        extend = require('lib/extend/extend'),
        actCommand = require('game/commands/act-command');

    return Entity;

    function Entity(data, entityAttributes, entityPositionFactory, loadedMixins, loadedBehaviors, logger) {
        var self = this,
            id = data.id || Uuid.v4(),
            currentState,
            mixins = {},
            states = {},
            entityBase = {},
            events = [],
            commands = [],
            positionManager;


        setPublicMethods();

        addMixins();
        init();

        function setPublicMethods() {
            entityBase.getData = getData;
            entityBase.setData = setData;
            entityBase.getState = getState;
            entityBase.getId = getId;
            entityBase.getType = getType;
            entityBase.kill = kill;
            entityBase.act = act;
            entityBase.hasMixin = hasMixin;
            entityBase.raiseEvent = raiseEvent;
            entityBase.getAttributes = getAttributes;
            entityBase.getPositionManager = getPositionManager;
            entityBase.perform = perform;
            extend(self, entityBase);
        }

        function init() {
            initAI();
            entityAttributes.setAttributes(data.attributes);
            positionManager = entityPositionFactory.get(self);
        }

        function initAI() {

            addStates();
            setInitialState();

            function addStates() {
                extend(true, states, self.getData().states);
                var keys = Object.keys(states);
                for (var i = 0; i < keys.length; i++) {
                    processBehaviors(states[keys[i]]);
                }
            }

            function setInitialState() {
                currentState = getData().initialState;
            }

            function processBehaviors(state) {
                for (var i = 0; i < state.behaviors.length; i++) {
                    var behavior = state.behaviors[i];
                    if (!('probability' in  behavior ))
                        behavior.probability = 1;
                    behavior.execute = loadedBehaviors.get(behavior.name).execute;
                }
            }

        }

        function addMixins() {
            var mixins = self.getData().mixins;
            for (var i = 0; i < mixins.length; i++)
                addMixin(mixins[i]);
        }

        function addMixin(name) {
            var mixin = loadedMixins.get(name);

            if (!mixin) {
                logger.logWarning(stringFormat('Invalid mixin: {name}', {name: name}));
                return;
            }

            mixins[name] = true;
            if (!('commands' in mixin))
                mixin = {events: [], commands: []};

            registerHandlers(events, mixin.events);
            registerHandlers(commands, mixin.commands);

            function registerHandlers(registar, handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    addEventHandler(handler.fn.constructor, handler.callback, registar);
                }
            }

            function addEventHandler(fn, handler, registrar) {
                if (!(fn in registrar))
                    registrar[fn] = [];
                registrar[fn].push(handler);
            }

        }

        function hasMixin(name) {
            return name in mixins;
        }

        function getData(key) {
            if (key === undefined)
                return data;

            return data[key];
        }

        function setData(key, value) {
            data[key] = value;
        }

        function getState() {
            return states[currentState];
        }

        function getId() {
            return id;
        }

        function getType() {
            return data.type;
        }

        function getAttributes() {
            return entityAttributes;
        }

        function getPositionManager() {
            return positionManager;
        }

        function kill() {
            self.state = 'dead';
            raiseEvent('killed');
            positionManager.setTile(null);
            positionManager.getLevel().removeEntity(self);
        }

        function act() {
            if (self.perform(actCommand()))
                return;

            if (!self.hasAlreadyActed)
                decideOnAction();
            self.hasAlreadyActed = false;
        }

        function decideOnAction() {
            for (var i = 0; i < getState().behaviors.length; i++) {
                var behavior = getState().behaviors[i];
                if (behavior.probability >= ROT.RNG.getUniform())
                    if (self.hasAlreadyActed = performAction(behavior))
                        return;
            }
//            logger.log('do nothing');
        }

        function performAction(behavior) {
            var result = behavior.execute(self);
            if (result === undefined)
                result = true;
            return result;
        }

        function perform(command) {
            var handlers = commands[command.constructor];
            var wasSuccessful = invokeHandlers(handlers, command);

            return wasSuccessful;
        }

        function invokeHandlers(handlers, data) {
            if (handlers === undefined || handlers.length === 0)
                return true;

            var result = {
                metSuccess: false,
                metFailure: false
            };
            for (var i = 0; i < handlers.length; i++) {
                var handlerResult = handlers[i].call(self, data);
                if (handlerResult === undefined) handlerResult = true;
                if (!result.metSuccess && handlerResult)
                    result.metSuccess = true;
                if (!result.metFailure && !handlerResult)
                    result.metFailure = true;
            }

            return result.metSuccess && !result.metFailure;
        }

        function raiseEvent(event) {
            var handlers = events[event.constructor];

            return invokeHandlers(handlers, event);
        }

        //
        //function raiseEvent(name) {
        //    var args = Array.prototype.slice.call(arguments, 1);
        //    var event = events[name];
        //    if (!event)
        //        return false;
        //
        //    var result = {
        //        metSuccess: false,
        //        metFailure: false
        //    };
        //
        //    for (var i = 0; i < event.handlers.length; i++) {
        //        var handlerResult = event.handlers[i].apply(self, args);
        //        if (handlerResult === undefined) handlerResult = true;
        //        if (!result.metSuccess && handlerResult)
        //            result.metSuccess = true;
        //        if (!result.metFailure && !handlerResult)
        //            result.metFailure = true;
        //    }
        //
        //    return result.metSuccess && !result.metFailure;
        //}
    }
});