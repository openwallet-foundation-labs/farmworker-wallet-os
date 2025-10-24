"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useCameraRoll = require("./useCameraRoll");
Object.keys(_useCameraRoll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCameraRoll[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCameraRoll[key];
    }
  });
});
var _CameraRoll = require("./CameraRoll");
Object.keys(_CameraRoll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CameraRoll[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CameraRoll[key];
    }
  });
});
var _CameraRollIOSPermission = require("./CameraRollIOSPermission");
Object.keys(_CameraRollIOSPermission).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CameraRollIOSPermission[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CameraRollIOSPermission[key];
    }
  });
});
//# sourceMappingURL=index.js.map