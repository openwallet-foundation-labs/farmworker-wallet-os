"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Button = ({
  buttonStyle,
  onPress,
  iconSrc,
  textStyle,
  children
}) => /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
  activeOpacity: 0.5,
  style: [styles.button, buttonStyle],
  onPress: onPress
}, /*#__PURE__*/React.createElement(_reactNative.Image, {
  style: styles.icon,
  source: iconSrc
}), /*#__PURE__*/React.createElement(_reactNative.Text, {
  style: [styles.buttonText, textStyle]
}, children));

var _default = Button;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    padding: 10
  },
  buttonText: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  icon: {
    height: 28,
    marginLeft: 10,
    marginRight: 30,
    width: 28
  }
});
//# sourceMappingURL=Button.js.map