"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class NotifeeNativeModule {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore unused value
    _moduleConfig;
    constructor(config) {
        this._moduleConfig = Object.assign({}, config);
    }
    get emitter() {
        return new react_native_1.NativeEventEmitter();
    }
    get native() {
        return {};
    }
}
exports.default = NotifeeNativeModule;
//# sourceMappingURL=NotifeeNativeModule.web.js.map