"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nativeInterface = _interopRequireDefault(require("./nativeInterface"));
var _internetReachability = _interopRequireDefault(require("./internetReachability"));
var PrivateTypes = _interopRequireWildcard(require("./privateTypes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
class State {
  constructor(configuration) {
    _defineProperty(this, "_nativeEventSubscription", null);
    _defineProperty(this, "_subscriptions", new Set());
    _defineProperty(this, "_latestState", null);
    _defineProperty(this, "_internetReachability", void 0);
    _defineProperty(this, "_handleNativeStateUpdate", state => {
      // Update the internet reachability module
      this._internetReachability.update(state);

      // Convert the state from native to JS shape
      const convertedState = this._convertState(state);

      // Update the listeners
      this._latestState = convertedState;
      this._subscriptions.forEach(handler => handler(convertedState));
    });
    _defineProperty(this, "_handleInternetReachabilityUpdate", isInternetReachable => {
      if (!this._latestState) {
        return;
      }
      const nextState = {
        ...this._latestState,
        isInternetReachable
      };
      this._latestState = nextState;
      this._subscriptions.forEach(handler => handler(nextState));
    });
    _defineProperty(this, "_fetchCurrentState", async requestedInterface => {
      const state = await _nativeInterface.default.getCurrentState(requestedInterface);

      // Update the internet reachability module
      this._internetReachability.update(state);
      // Convert and store the new state
      const convertedState = this._convertState(state);
      if (!requestedInterface) {
        this._latestState = convertedState;
        this._subscriptions.forEach(handler => handler(convertedState));
      }
      return convertedState;
    });
    _defineProperty(this, "_convertState", input => {
      if (typeof input.isInternetReachable === 'boolean') {
        return input;
      } else {
        return {
          ...input,
          isInternetReachable: this._internetReachability.currentState()
        };
      }
    });
    _defineProperty(this, "latest", requestedInterface => {
      if (requestedInterface) {
        return this._fetchCurrentState(requestedInterface);
      } else if (this._latestState) {
        return Promise.resolve(this._latestState);
      } else {
        return this._fetchCurrentState();
      }
    });
    _defineProperty(this, "add", handler => {
      // Add the subscription handler to our set
      this._subscriptions.add(handler);

      // Send it the latest data we have
      if (this._latestState) {
        handler(this._latestState);
      } else {
        this.latest().then(handler);
      }
    });
    _defineProperty(this, "remove", handler => {
      this._subscriptions.delete(handler);
    });
    _defineProperty(this, "tearDown", () => {
      if (this._internetReachability) {
        this._internetReachability.tearDown();
      }
      if (this._nativeEventSubscription) {
        this._nativeEventSubscription.remove();
      }
      this._subscriptions.clear();
    });
    // Add the listener to the internet connectivity events
    this._internetReachability = new _internetReachability.default(configuration, this._handleInternetReachabilityUpdate);

    // Add the subscription to the native events
    this._nativeEventSubscription = _nativeInterface.default.eventEmitter.addListener(PrivateTypes.DEVICE_CONNECTIVITY_EVENT, this._handleNativeStateUpdate);

    // Fetch the current state from the native module
    this._fetchCurrentState();
  }
}
exports.default = State;
//# sourceMappingURL=state.js.map