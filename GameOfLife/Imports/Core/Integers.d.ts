export declare class Int {
    private value;
    constructor(value: number);
    getValue(): number;
    each(body: (x: Int) => void): void;
}
export declare class EagerRange {
    private count;
    private a;
    constructor(count: Int);
    For(body: (i: Int) => void): void;
}
