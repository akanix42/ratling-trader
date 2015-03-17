define(function (require) {
    var EntityAttribute = require('game/entities/entity-attribute');
    var when = require('when');

    describe('models - entity attribute', function(){
        describe('.base', function() {
            it('should be settable', function () {
                var attribute = new EntityAttribute({base: 5, max: 6});

                attribute.base.should.equal(5);
                attribute.base++;
                attribute.base.should.equal(6);
            });

            it('should not be settable to more than the max value', function () {
                var attribute = new EntityAttribute({base: 5, max: 0});

                attribute.base.should.equal(5);
                attribute.base++;
                attribute.base.should.equal(0);
            });
        });
        describe('.max', function() {
            it('should be settable', function () {
                var attribute = new EntityAttribute({max: 5});

                attribute.max.should.equal(5);
                attribute.max++;
                attribute.max.should.equal(6);
            });

            it('should default to the base value', function () {
                var attribute = new EntityAttribute({base: 5});

                attribute.max.should.equal(5);
            });
        });
        describe('.modifiers', function() {
            it('should be used to calculate the bonus attribute', function () {
                var attribute = new EntityAttribute({modifiers: [{name: 'a', value: 4}]});

                attribute.bonus.should.equal(4);
                attribute.modifiers.set({name:'a', value: 5});
                attribute.bonus.should.equal(5);
                attribute.modifiers.set({name:'b', value: 1});
                attribute.bonus.should.equal(6);
            });
        });

        describe('.current', function() {
            it('should be a combination of the base and bonus attributes', function () {
                var attribute = new EntityAttribute({base: 1, modifiers: [{name: 'a', value: 4}]});

                attribute.current.should.equal(5);
            });
        });
    });


});