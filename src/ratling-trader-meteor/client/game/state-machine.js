"use strict";

Game.registerUnique("stateMachine", StateMachine);

function StateMachine() {
    this._ = {
        currentState: null,
        previousStates: {},
        states: null
    };
}

StateMachine.prototype = {
    get currentState() {
        return this._.currentState;
    },
    set states(states) {
        this._.states = states || {};
        if (!this.currentState || !(this.currentState in states))
            switchToDefaultState.call(this);
    },
    execute: execute,
    resetPreviousStates: resetPreviousStates,
    switchTo: switchTo
};

function execute(entity) {
    if (!this._.currentState) return null;

    return this._.states[this._.currentState].behavior.execute(entity);
}

function switchToDefaultState() {
    if (this._.states.default && this._.states.default.length > 0)
        this._.currentState = this._.states.default[0].name;
}

function resetPreviousStates() {
    this._.previousStates = {};
}

function switchTo(stateName, entity) {
    if (!(stateName in this._.states))
        return null;

    this._.previousStates[this._.currentState] = true;
    this._.currentState = stateName;

    if (stateName in this._.previousStates)
        return null;

    var behavior = this._.states[stateName].behavior;
    behavior.execute(entity);
    return behavior;
}