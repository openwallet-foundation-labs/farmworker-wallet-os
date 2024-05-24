"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorPickupStrategy = void 0;
var MediatorPickupStrategy;
(function (MediatorPickupStrategy) {
    // Use PickUp v1 protocol to periodically retrieve messages
    MediatorPickupStrategy["PickUpV1"] = "PickUpV1";
    // Use PickUp v2 protocol to periodically retrieve messages
    MediatorPickupStrategy["PickUpV2"] = "PickUpV2";
    // Use PickUp v2 protocol in Live Mode to get incoming messages as soon as they arrive
    // to mediator
    MediatorPickupStrategy["PickUpV2LiveMode"] = "PickUpV2LiveMode";
    // Implicit pickup strategy means picking up messages only using return route
    // decorator. This is what ACA-Py currently uses
    MediatorPickupStrategy["Implicit"] = "Implicit";
    // Do not pick up messages
    MediatorPickupStrategy["None"] = "None";
})(MediatorPickupStrategy = exports.MediatorPickupStrategy || (exports.MediatorPickupStrategy = {}));
//# sourceMappingURL=MediatorPickupStrategy.js.map