import { ConfigPlugin } from '@expo/config-plugins';
type Props = {
    iosPermissions?: ('AppTrackingTransparency' | 'Bluetooth' | 'Calendars' | 'CalendarsWriteOnly' | 'Camera' | 'Contacts' | 'FaceID' | 'LocationAccuracy' | 'LocationAlways' | 'LocationWhenInUse' | 'MediaLibrary' | 'Microphone' | 'Motion' | 'Notifications' | 'PhotoLibrary' | 'PhotoLibraryAddOnly' | 'Reminders' | 'Siri' | 'SpeechRecognition' | 'StoreKit')[];
};
declare const withPermissions: ConfigPlugin<Props>;
export default withPermissions;
//# sourceMappingURL=expo.d.ts.map