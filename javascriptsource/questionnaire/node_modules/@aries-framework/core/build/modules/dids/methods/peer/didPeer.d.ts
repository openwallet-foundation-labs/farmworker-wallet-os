export declare function isValidPeerDid(did: string): boolean;
export declare enum PeerDidNumAlgo {
    InceptionKeyWithoutDoc = 0,
    GenesisDoc = 1,
    MultipleInceptionKeyWithoutDoc = 2
}
export declare function getNumAlgoFromPeerDid(did: string): PeerDidNumAlgo;
