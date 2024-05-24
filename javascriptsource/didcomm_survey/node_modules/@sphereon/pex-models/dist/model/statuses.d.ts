import { PdStatus } from './pdStatus';
export interface Statuses {
    active?: PdStatus;
    suspended?: PdStatus;
    revoked?: PdStatus;
}
