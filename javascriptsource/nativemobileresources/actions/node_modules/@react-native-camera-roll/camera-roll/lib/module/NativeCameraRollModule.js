/* eslint-disable @typescript-eslint/ban-types */
// we use Object type because methods on the native side use NSDictionary and ReadableMap
// and we want to stay compatible with those
import { TurboModuleRegistry } from 'react-native';
export default TurboModuleRegistry.getEnforcing('RNCCameraRoll');
//# sourceMappingURL=NativeCameraRollModule.js.map