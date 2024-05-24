export interface Descriptor {
    id: string;
    path: string;
    path_nested?: Descriptor;
    format: string;
}
