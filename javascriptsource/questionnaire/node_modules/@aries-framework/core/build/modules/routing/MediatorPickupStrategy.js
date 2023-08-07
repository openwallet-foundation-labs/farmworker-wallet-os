"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorPickupStrategy = void 0;
var MediatorPickupStrategy;
(function (MediatorPickupStrategy) {
    // Explicit pickup strategy means picking up messages using the pickup protocol
    MediatorPickupStrategy["PickUpV1"] = "PickUpV1";
    // Supports pickup v2
    MediatorPickupStrategy["PickUpV2"] = "PickUpV2";
    // Implicit pickup strategy means picking up messages only using return route
    // decorator. This is what ACA-Py currently uses
    MediatorPickupStrategy["Implicit"] = "Implicit";
    // Do not pick up messages
    MediatorPickupStrategy["None"] = "None";
})(MediatorPickupStrategy = exports.MediatorPickupStrategy || (exports.MediatorPickupStrategy = {}));
//# sourceMappingURL=MediatorPickupStrategy.js.map