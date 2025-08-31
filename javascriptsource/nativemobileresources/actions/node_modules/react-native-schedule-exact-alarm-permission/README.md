![NPM Version](https://img.shields.io/npm/v/react-native-schedule-exact-alarm-permission?style=flat-square&label=version&color=darkgreen)
![Static Badge](https://img.shields.io/badge/platform-Android-darkgreen?style=flat-square)
![Static Badge](https://img.shields.io/badge/license-MIT-darkgreen?style=flat-square)

> For the latest documentation, please refer to this [documentation](https://github.com/mybeon/react-native-schedule-exact-alarm-permission#readme).

## Installation

Install the package using npm:

```sh
npm install react-native-schedule-exact-alarm-permission --save
```

or Yarn

```sh
yarn add react-native-schedule-exact-alarm-permission
```

### Autolinking

Since version 0.60 React Native does linking of modules [automatically](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md).

## Description

This package allows checking the status of the schedule exact alarm permission and requesting it if it's not already enabled. As of Android 14, users are required to grant schedule exact alarm permission before its usage, while in Android 13, this permission is automatically granted. [read more.](https://developer.android.com/about/versions/14/changes/schedule-exact-alarms)

## Dependencies

This package assumes that the `SCHEDULE_EXACT_ALARM` permission is included in the AndroidManifest.xml file. If it's not present, please ensure to add the permission to `android/app/src/main/AndroidManifest.xml`. Otherwise, the package will not function correctly.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- This permission is required, add it if missing. -->
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />

</manifest>
```

## Example App

The repository [react-native-schedule-exact-alarm-permission](https://github.com/mybeon/react-native-schedule-exact-alarm-permission/tree/main/example) hosts an example app for the Android platform.

## Usage

#### useSEA

`useSEA()` is a react custom hook that returns a boolean indicating whether the schedule exact alarm permission is granted. This hook also automatically updates its returned value whenever the application returns to the active state. If the API level is below 34 (Android 14), this hook will always return `true`.

```js
import { useSEA } from 'react-native-schedule-exact-alarm-permission';

export default function App() {
  const SEAstatus = useSEA();

  return (
    <View>
      <Text>status: {`${SEAstatus}`}</Text>
    </View>
  );
}
```

#### checkPermission

Similar to the `useSEA()` hook, `checkPermission()` provides the status of the schedule exact alarm permission. However, the key distinction lies in checkPermission being a standard asynchronous function, enabling its use outside of a React component.

```js
import { checkPermission } from 'react-native-schedule-exact-alarm-permission';

const permissionStatus = await checkPermission();
```

#### getPermission

`getPermission()` function directs users to the Alarms & Reminders screen in system settings, allowing them to grant the permission. When used alongside `useSEA()`, the status value updates accordingly based on the user's actions once they return to the app. This function remains inactive if the permission is already granted or if the user's API level is below 34 (Android 14).

```js
import {
  getPermission,
  useSEA,
} from 'react-native-schedule-exact-alarm-permission';

export default function App() {
  const SEAstatus = useSEA();

  return (
    <View style={styles.container}>
      <Text>Result: {`${SEAstatus}`}</Text>
      <Button
        title="Get SEA permission"
        onPress={() => {
          getPermission();
        }}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE)
