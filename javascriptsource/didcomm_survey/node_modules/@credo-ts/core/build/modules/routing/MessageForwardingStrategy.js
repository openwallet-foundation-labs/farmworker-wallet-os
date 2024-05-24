"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageForwardingStrategy = void 0;
var MessageForwardingStrategy;
(function (MessageForwardingStrategy) {
    // When a forward is received, simply queue encrypted message. MessagePickupRepository
    // will be in charge of manually triggering MessagePickupApi.deliverMessages()
    MessageForwardingStrategy["QueueOnly"] = "QueueOnly";
    // Queue message into MessagePickupRepository and, if a Message Pickup Live mode session is active,
    // deliver it along any other queued message
    MessageForwardingStrategy["QueueAndLiveModeDelivery"] = "QueueAndLiveModeDelivery";
    // Attempt to deliver message directly if a transport session is available. It will eventually added
    // into pickup queue in case of failure on the delivery
    MessageForwardingStrategy["DirectDelivery"] = "DirectDelivery";
})(MessageForwardingStrategy = exports.MessageForwardingStrategy || (exports.MessageForwardingStrategy = {}));
//# sourceMappingURL=MessageForwardingStrategy.js.map