export type Status = 'info' | 'warn' | 'error';
export declare const Status: {
    INFO: Status;
    WARN: Status;
    ERROR: Status;
};
export interface Checked {
    tag: string;
    status: Status;
    message?: string;
}
export declare const Checked: {
    new (tag: string, status: Status, message?: string): {
        tag: string;
        status: Status;
        message?: string | undefined;
    };
};
export type NonEmptyArray<T> = [T, ...T[]];
type AreInvalid = (checked: Checked[]) => boolean;
export declare const hasErrors: AreInvalid;
export {};
