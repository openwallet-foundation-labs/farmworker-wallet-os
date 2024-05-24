export class assert {
    static ok(predicate : boolean, message : string) {
        if (!predicate)
            throw new Error(message);
    }

    static equal(value : any, expected : any, message : string) {
        if (value !== expected)
            throw new Error(message);
    }
}