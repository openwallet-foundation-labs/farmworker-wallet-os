import { useEffect, useState } from 'react';
import { AppState, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-schedule-exact-alarm-permission' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ScheduleExactAlarmPermission = NativeModules.ScheduleEA
  ? NativeModules.ScheduleEA
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const getPermission: () => void =
  ScheduleExactAlarmPermission.getPermission;

export const checkPermission = (): Promise<boolean> => {
  return new Promise((resolve, _) => {
    ScheduleExactAlarmPermission.checkPermission((result: boolean) => {
      resolve(result);
    });
  });
};

export const useSEA = () => {
  const [state, setState] = useState<boolean | undefined>(undefined);

  function check() {
    ScheduleExactAlarmPermission.checkPermission((result: boolean) => {
      setState(result);
    });
  }

  useEffect(() => {
    check();
    const unsubscribe = AppState.addEventListener('change', (appState) => {
      if (appState.match(/active/)) {
        check();
      }
    });

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return state;
};
