define(function (require) {
        var beforeMoveEvent = require('game/events/before-move-event'),
            afterMoveEvent = require('game/events/after-move-event'),
            afterPlaceEvent = require('game/events/after-place-event');

        return collidable;

        function collidable(mixinFactory) {
            var mixin = mixinFactory.get();
            mixin.addEvent(afterPlaceEvent, afterPlace);
            mixin.addEvent(afterMoveEvent, afterMove);
            mixin.setInit(init);
            return mixin;

            function init(entity) {
                entity.setData('collidable', true);
            }

            function afterPlace(event) {
                var self = this;
                if (self !== event.entity)
                    return;
                subscribeToTile(self, event.destination);
            }

            function afterMove(event) {
                var self = this;
                if (self !== event.entity)
                    return;

                unsubscribeFromTile(self, event.origin);
                subscribeToTile(self, event.destination);
            }

            function unsubscribeFromTile(self, tile) {
                tile.eventHub.unsubscribe(self, beforeMoveEvent);
            }

            function subscribeToTile(self, tile) {
                tile.eventHub.subscribe(self, beforeMoveEvent, beforeTileMovedTo);
            }

            function beforeTileMovedTo(event) {
                var self = this;
                if (self === event.entity)
                    return;
                if (event.entity.getData('collidable'))
                    event.blockedBy = self;
            }
        }
    }
)
;