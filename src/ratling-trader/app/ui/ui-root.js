define(function (require) {
        'use strict';
        var when = require('when');
        var CompositionRoot = require('composition-root');

        function UiRoot() {
            CompositionRoot.call(this);
        }

        UiRoot.prototype = Object.create(CompositionRoot.prototype);

        UiRoot.prototype.init = function init() {
            var self = this;
            return when.all([
                self.registerModule('ui/ui-to-game-bridge', {isSingleton: true}),
                self.registerModule('ui/ui', {isSingleton: true}),
                self.registerModule('ui/display', {name: 'display', isSingleton: true}),
                self.registerModule('ui/screen-stack'),
                self.registerModule('ui/screens/inventory-screen'),
                self.registerModule('ui/screens/message-screen'),
                self.registerModule('ui/screens/playing-screen'),
                self.registerModule('ui/screens/main-menu-screen'),
                self.registerModule('ui/tiles/ascii-tile-factory'),
                self.registerModule('game/events/event-handlers'),
                self.registerModule('game/event-recorder', {isSingleton: true}),


            ]);
        };
        return UiRoot;

    }
)
;