import { Status } from './status';
export interface Issue {
    code: string;
    tag: string;
    message: string;
    status: Status;
}
export declare namespace Issue {
}
