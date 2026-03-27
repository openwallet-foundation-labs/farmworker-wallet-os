# Migration to the New Architecture

This file is a tracker for what has been done to work on the migration of this library and to keep also track of the various todo:

## TODO

- [] Write JS spec in Flow for the New Architecture
- [] Implent the new Native Code on iOS
- [] Implent the new Native Code on Android
- [] Test on OldArch app (iOS)
- [] Test on OldArch app (Android)
- [] Test on NewArch app (iOS)
- [] Test on NewArch app (Android)
- [] Open PR

## Done

### Setup
1. Forked and cloned the repo
1. Checked the list of APIs to migrate.
1. Created an `OldArch` app (0.70) configured for the Old Architecture.
1. Run the app to make sure that it works properly.
1. Created a `NewArch` app (0.70) configured for the New Architecture.
1. Switched the flags for iOS and Android to have the new arch enabled by default
1. Run the app to make sure that it works properly.
1. Moved the apps in the `examples` folder

### Installing blob-utils
1. Move to `OldArch`
1. Run `yarn add ../..` to install the blob utils.
1. `cd ios`
1. `bundle install && bundle exec pod install`
1. `cd ..`
1. `npx react-native run-ios`
1. Copy the app JS code from `examples/ReactNativeBlobUtil/App.js` to `examples/OldArch/App.js`
1. Fixed various JS issues
1. The app depends on the `Picker`. *Note:* It does not support the New Arch, we need to figure out another way to choose.
    1. run `yarn add @react-native-picker/picker`
    1. run `bundle exec pod install` from the iOS folder
    1. re-run the app
1. Repeat the above steps for `NewArch`
