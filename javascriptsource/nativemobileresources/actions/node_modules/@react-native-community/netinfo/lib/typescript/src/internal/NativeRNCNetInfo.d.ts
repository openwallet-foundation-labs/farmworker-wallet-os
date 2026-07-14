import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    configure: (config: Object) => void;
    getCurrentState(requestedInterface?: string): Promise<Object>;
    addListener: (eventName: string) => void;
    removeListeners: (count: number) => void;
}
declare const _default: Spec;
export default _default;
