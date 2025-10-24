import { TurboModuleRegistry } from 'react-native';
// we call get here since on Android this module does not exist and it would throw
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default TurboModuleRegistry.get('RNCCameraRollPermission');
//# sourceMappingURL=NativeCameraRollPermissionModule.js.map