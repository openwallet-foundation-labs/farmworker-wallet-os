import { Status } from './status';
import { Issue } from './issue';
export interface StatusResponse {
    status: Status;
    issues: Array<Issue>;
}
export declare namespace StatusResponse {
}
