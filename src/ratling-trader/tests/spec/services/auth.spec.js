define(function (require) {
    var AuthService = require('services/auth');

    describe('Auth Service', function () {
        describe('isSignedIn', function () {
            it('should return a promise', function () {
                var service = AuthService();
                expect('then' in service.isSignedIn()).toBe(true);
            });
        });
        describe('signIn', function () {
            it('should return a promise', function () {
                var service = AuthService();
                expect('then' in service.signIn()).toBe(true);
            });
        });
        describe('signOut', function () {
            it('should return a promise', function () {
                var service = AuthService();
                expect('then' in service.signOut()).toBe(true);
            });
        });
    });
});