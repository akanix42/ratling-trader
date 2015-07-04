"use strict";
//var EntityFactory = Game.getType("entityFactory");

describe('EntityFactory', function () {
    it('should instantiate the attributes', function (done) {
        var entityFactory = Game.container.get('entityFactory');
        var entity = entityFactory.get({attributes: {a: {base: 1}}});

        expect(entity.attributes.get('a').base).toEqual(1);
    });
});
