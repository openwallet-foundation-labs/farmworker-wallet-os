export type AllSettledFulfilled<T> = {
    status: 'fulfilled';
    value: T;
};
export type AllSettledRejected = {
    status: 'rejected';
    reason: any;
};
export declare function allSettled<T>(promises: Promise<T>[]): Promise<(AllSettledRejected | AllSettledFulfilled<T>)[]>;
export declare function onlyFulfilled<T>(entries: Array<AllSettledFulfilled<T> | AllSettledRejected>): AllSettledFulfilled<T>[];
export declare function onlyRejected<T>(entries: Array<AllSettledFulfilled<T> | AllSettledRejected>): AllSettledRejected[];
