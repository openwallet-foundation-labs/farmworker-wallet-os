import { ExchangeStatus } from './exchangeStatus';
export interface PresentationStatus {
    presentation_id: string;
    status: ExchangeStatus;
    message?: string;
}
export declare namespace PresentationStatus {
}
