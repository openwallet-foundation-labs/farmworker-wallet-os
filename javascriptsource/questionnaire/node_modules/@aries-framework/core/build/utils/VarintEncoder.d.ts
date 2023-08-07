import { Buffer } from './buffer';
export declare class VarintEncoder {
    static decode(data: Uint8Array | number[] | Buffer): readonly [number, number | undefined];
    static encode(int: number): Buffer;
    static encodingLength(int: number): number;
}
