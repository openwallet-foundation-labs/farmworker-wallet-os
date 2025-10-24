# Native Template
 
This native template repo was initially set up using the Mendix Native Mobile Builder. For more information on how to initiate this repo for the Preparese app, please review the following documentation: https://docs.mendix.com/refguide10/mobile/distributing-mobile-apps/building-native-apps/native-build-locally/

Once the repo is initialized using the Mendix Native Mobile Builder as mentioned above, subsequent builds can follow the procedure referenced in the Build a Mendix Native App Locally Manually documentation : https://docs.mendix.com/refguide10/mobile/distributing-mobile-apps/building-native-apps/native-build-locally-manually/

## Build a Mendix Native App Locally Manually

### Tool setup


```
# nvm install --lts
# nvm use --lts
nvm install 20
nvm use 20
npm install --legacy-peer-deps
npm run configure
```

### Install required react-native dependencies

#### Install iOS dependencies
```
//For iOS builds only, Credo-ts (v0.5.13)
npm install @mendix/react-native-sqlite-storage
```

```
cd ios
pod install --repo-update
```

### Building an Android App with Android Studio

#### Edit `android/app/build.gradle`
1. Add JNA as follows

```
dependencies {
    ...
    //Required by Credo-ts
    implementation 'net.java.dev.jna:jna:5.2.0'
    ...
}
```

2. For smaller APK sizes, limit the buildTypes by editing `android/app/build.gradle` and add abiFilters as follows [reference](https://developer.android.com/ndk/guides/abis)

```
...
     buildTypes {
        release {
            ...
            ndk {
                abiFilters "armeabi-v7a", "arm64-v8a"
            }
        }
        debug {
            ndk {
                abiFilters "armeabi-v7a", "arm64-v8a"
            }
        }
    }
...
```

#### Enable http (unencrypted) traffic for developerApp distribution
This step is required if you are deploying the LOCALDEV distribution via Google Play Store

1. Edit app/src/dev/AndroidManifest.xml

```
...
    <application
        android:name="com.mendix.nativetemplate.DevApplication"
        tools:replace="android:name"
        android:usesCleartextTraffic="true">
...        

```
