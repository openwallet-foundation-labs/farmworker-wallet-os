import type { TurboModule } from 'react-native';
export type DocumentPickerResponse = {
    uri: string;
    name: string;
    copyError?: string;
    fileCopyUri: string | null;
    type: string | null;
    size: number | null;
};
export type DirectoryPickerResponse = {
    uri: string;
};
export interface Spec extends TurboModule {
    readonly getConstants: () => {};
    pick(options: Object): Promise<DocumentPickerResponse[]>;
    releaseSecureAccess(uris: string[]): Promise<void>;
    pickDirectory(): Promise<DirectoryPickerResponse>;
}
export declare const NativeDocumentPicker: Spec;
//# sourceMappingURL=NativeDocumentPicker.d.ts.map