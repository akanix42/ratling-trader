define(function (require) {
    'use strict';
    var StateMachine = require('../state-machine');

    describe('state machine', function () {
        it('should expose the current state', function () {
            var stateMachine = new StateMachine();
            stateMachine._private.currentState = 'test';
            stateMachine.currentState.should.equal('test');
        });

        it('should default to the default state', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'default': ['test']
            };
            stateMachine.currentState.should.equal('test');
        });

        it('should switch to the given available state', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'test2': {behavior: emptyFunction},
                'default': ['test']
            };
            stateMachine.switchTo('test2');
            stateMachine.currentState.should.equal('test2');
        });

        it('should return the new state after switching', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'test2': {behavior: emptyFunction},
                'default': ['test']
            };
            var state = stateMachine.switchTo('test2');
            state.should.equal(stateMachine._private.states['test2'].behavior);
        });

        it('should not change the state if the new state does not exist', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'default': ['test']
            };
            stateMachine.switchTo('test2');
            stateMachine.currentState.should.equal('test');
        });

        it('should return null if the new state does not exist', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'default': ['test']
            };
            (stateMachine.switchTo('test2') === null).should.be.true();
        });

        it('should return null when switching back to a previous state', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'default': ['test']
            };
            stateMachine.switchTo('test2');
            (stateMachine.switchTo('test') === null).should.be.true();
        });

        it('should not return null when switching back to a previous state after the previous states has been reset', function () {
            var stateMachine = new StateMachine();
            stateMachine.states = {
                'test': {behavior: emptyFunction},
                'default': ['test']
            };
            stateMachine.switchTo('test2');
            stateMachine.resetPreviousStates();
            (stateMachine.switchTo('test') === null).should.be.true();
        });

    });

    function emptyFunction() {
    }
});
