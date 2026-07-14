"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotifeeApiModule_1 = __importDefault(require("./NotifeeApiModule"));
const version_1 = require("./version");
const utils_1 = require("./utils");
const apiModule = new NotifeeApiModule_1.default({
    version: version_1.version,
    nativeModuleName: 'NotifeeApiModule',
    nativeEvents: utils_1.isIOS
        ? [utils_1.kReactNativeNotifeeNotificationEvent, utils_1.kReactNativeNotifeeNotificationBackgroundEvent]
        : [utils_1.kReactNativeNotifeeNotificationEvent],
});
const statics = {
    SDK_VERSION: version_1.version,
};
const defaultExports = Object.assign(apiModule, statics);
exports.default = defaultExports;
__exportStar(require("./types/Library"), exports);
__exportStar(require("./types/Notification"), exports);
__exportStar(require("./types/Trigger"), exports);
__exportStar(require("./types/NotificationIOS"), exports);
__exportStar(require("./types/NotificationAndroid"), exports);
//# sourceMappingURL=index.js.map