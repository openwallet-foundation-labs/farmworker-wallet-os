export declare enum AckValues {
    Receipt = "RECEIPT",
    Outcome = "OUTCOME"
}
/**
 * Represents `~please_ack` decorator
 */
export declare class AckDecorator {
    constructor(options: {
        on: [AckValues.Receipt];
    });
    on: AckValues[];
}
