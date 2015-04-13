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
        resetPreviousStates: resetPreviousStates,
        switchTo: switchTo
    };


    function switchToDefaultState() {
        this._private.currentState = this._private.states.default[0];
    }

    function resetPreviousStates() {
        this._private.previousStates = {};
    }

    function switchTo(stateName) {
        if (!(stateName in this._private.states))
            return null;

        this._private.previousStates[this._private.currentState] = true;
        this._private.currentState = stateName;

        if (stateName in this._private.previousStates)
            return null;

        return this._private.states[stateName].behavior;
    }

    return StateMachine;

});