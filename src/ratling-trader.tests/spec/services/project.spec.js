define(function (require) {
    var ProjectService = require('services/project');

    describe('Project Service', function () {
        describe('getDetails', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.getDetails()).toBe(true);
            });
        });
        describe('getDeliverables', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.getDeliverables()).toBe(true);
            });
        });
        describe('getHours', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.getHours()).toBe(true);
            });
        });
        describe('create', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.create()).toBe(true);
            });
        });
        describe('updateDetails', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.updateDetails()).toBe(true);
            });
        });
        describe('remove', function () {
            it('should return a promise', function () {
                var service = ProjectService();
                expect('then' in service.remove()).toBe(true);
            });
        });
    });

});