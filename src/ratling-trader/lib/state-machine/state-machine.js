define(function () {
    'use strict';

    function StateMachine() {
        this._private = {
            currentState: null,
            previousStates: {}
        };
    }

    StateMachine.prototype = {
        get currentState() {
            return this._private.currentState;
        },
        set states(states) {
            this._private.states = states || {};
            if (!this.currentState || !(this.currentState in states))
                switchToDefaultState.call(this);
        },
        execute: execute,
        resetPreviousStates: resetPreviousStates,
        switchTo: switchTo
    };

    function execute(entity) {
        if (!this._private.currentState) return null;

        return this._private.states[this._private.currentState].behavior.execute(entity);
    }

    function switchToDefaultState() {
        if (this._private.states.default && this._private.states.default.length > 0)
            this._private.currentState = this._private.states.default[0].name;
    }

    function resetPreviousStates() {
        this._private.previousStates = {};
    }

    function switchTo(stateName, entity) {
        if (!(stateName in this._private.states))
            return null;

        this._private.previousStates[this._private.currentState] = true;
        this._private.currentState = stateName;

        if (stateName in this._private.previousStates)
            return null;

        var behavior = this._private.states[stateName].behavior;
        behavior.execute(entity);
        return behavior;
    }

    return StateMachine;

});