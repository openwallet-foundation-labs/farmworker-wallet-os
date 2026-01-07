# Farmworker Wallet OS

The Farmworker Wallet OS is a solution framework built to jumpstart the integration of digital trust technologies with the [Mendix](https://www.mendix.com/) low-code application platform. The framework 
makes it easy for any Mendix app to interoperate with open-standard technologies like [decentralized identifiers](https://www.w3.org/TR/did-core/), [DIDComm](https://didcomm.org), and [verifiable credentials](https://www.w3.org/TR/vc-data-model/).

<img src="https://github.com/Entidad/fwos-demo-app/blob/main/img/preview.gif?raw=true" width="100%" />

## Quick Start

* Clone this project
* Navigate to the project root from a command line Terminal e.g. `cd ~/Workspaces/Github/farmworker-wallet-os`
* Run `./install.sh`
* Download [Studio Pro 10.24.13](https://marketplace.mendix.com/link/studiopro/)
* Open `fwos-demo-app.mpr` from Studio Pro
* Run the project from Studio Pro by clicking Run / Run Locally
* Create a custom React Native application from Native Template `./resources/native_template`
* Install and run the application on your mobile device
* Log in using user name, for example `Alice` or  `Bob`

## Run Native app
* `cd ~/resources/native_template`
* Install Node v22 `nvm install 22`
* Install npm dependencies 
    * `npm i --legacy-peer-deps`
    * `npm run configure`

### Android build configuration for Android Studio
* Install Android Studio Ladybug Feature Drop | 2024.2.2
* Edit `android/app/build.gradle`
    * Add JNA as follows
    ```
    dependencies {
        ...
        //Required by Credo-ts
        implementation 'net.java.dev.jna:jna:5.2.0'
        ...
    }
    ```
    * For smaller APK sizes, limit the buildTypes by editing android/app/build.gradle and add abiFilters as follows [reference](https://developer.android.com/ndk/guides/abis)
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
* Edit `app/src/dev/AndroidManifest.xml` 
    * Enable http (unencrypted) traffic for developerApp distribution. This step is required if you are deploying the LOCALDEV distribution via Google Play Store.
    ```
    ...
        <application
            android:name="com.mendix.nativetemplate.DevApplication"
            tools:replace="android:name"
            android:usesCleartextTraffic="true">
    ...
    ```
### iOS build configuration for Xcode
* Install Xcode 16.2
* Install iOS dependencies
    * For iOS builds only, Credo-ts (v0.5.13) `cd ~/resources/native_template`
    * `npm install @mendix/react-native-sqlite-storage`
    * Install Pods
    ```
    cd ios
    pod install --repo-update
    ```

## Contributing
See [CONTRIBUTING.md](https://github.com/openwallet-foundation-labs/farmworker-wallet-os/blob/main/CONTRIBUTING.md).

## Raising problems/issues
-   We encourage everyone to use [/issues](https://github.com/openwallet-foundation-labs/farmworker-wallet-os) in case of any problems.



