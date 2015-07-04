"use strict";
var EntityAttribute;

describe('EntityAttribute', function () {
    beforeEach(function(){
        if (!EntityAttribute)
        EntityAttribute = Game.getType("entityAttribute");
    });

    describe('base', function () {
        it('should be settable', function () {
            var attribute = new EntityAttribute({base: 5, max: 6});

            expect(attribute.base).toBe(5);
            attribute.base++;
            expect(attribute.base).toBe(6);
        });

        it('should not be settable to more than the max value', function () {
            var attribute = new EntityAttribute({base: 5, max: 0});

            expect(attribute.base).toBe(5);
            attribute.base++;
            expect(attribute.base).toBe(0);
        });
    });

    describe('max', function () {
        it('should be settable', function () {
            var attribute = new EntityAttribute({max: 5});

            expect(attribute.max).toBe(5);
            attribute.max++;
            expect(attribute.max).toBe(6);
        });

        it('should default to the base value', function () {
            var attribute = new EntityAttribute({base: 5});

            expect(attribute.max).toBe(5);
        });
    });

    describe('modifiers', function () {
        it('should be used to calculate the bonus attribute', function () {
            var attribute = new EntityAttribute({modifiers: [{name: 'a', value: 4}]});

            expect(attribute.bonus).toBe(4);
            attribute.modifiers.set({name: 'a', value: 5});
            expect(attribute.bonus).toBe(5);
            attribute.modifiers.set({name: 'b', value: 1});
            expect(attribute.bonus).toBe(6);
        });
    });

    describe('current', function () {
        it('should be a combination of the base and bonus attributes', function () {
            var attribute = new EntityAttribute({base: 1, modifiers: [{name: 'a', value: 4}]});

            expect(attribute.current).toBe(5);
        });
    });
});
