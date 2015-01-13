"use strict";

define(function (require) {
  var forceNew = require("force-new");

  var intentHub = createIntentHub();
  return forceNew.whenCalled(intentHub);

  function createIntentHub() {
    function intentHub() {
      this.internal = { intents: {} };
    }

    intentHub.prototype.broadcast = function broadcast(intent) {
      var intents = this.internal.intents;
      var subscriptions = intents[intent.constructor];
      if (subscriptions === undefined) return [];

      var objections = [];
      for (var i = 0; i < subscriptions.length; i++) {
        var subscription = subscriptions[i];
        var objection = subscription.handler.call(subscription.entity, intent);
        if (objection !== undefined) objections.push(objection);
      }
      return objections;
    };

    intentHub.prototype.subscribe = function subscribe(entity, intent, handler) {
      var intents = this.internal.intents;
      if (!(intent.constructor in intents)) intents[intent.constructor] = [];
      intents[intent.constructor].push({ entity: entity, handler: handler });
    };

    intentHub.prototype.subscribeAll = function subscribe(entity, intents) {
      var self = this;

      for (var i = 0,
          l = intents.length; i < l; i++) {
        var intent = intents[i];
        self.subscribe(entity, intent.fn, intent.callback);
      }
    };

    intentHub.prototype.unsubscribe = function unsubscribe(entity, intent) {
      var intents = this.internal.intents;
      var subscriptions = intents[intent.constructor];
      if (subscriptions === undefined) return;

      for (var i = 0; i < subscriptions.length; i++) {
        var subscription = subscriptions[i];
        if (entity === subscription.entity) subscriptions.splice(entity, 1);
      }
    };
    return intentHub;
  }
});