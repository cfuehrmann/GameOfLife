export declare class Int {
    private value;
    constructor(value: number);
    public getValue(): number;
    public each(body: (x: Int) => void): void;
}
export declare class EagerRange {
    private count;
    private a;
    constructor(count: Int);
    public For(body: (i: Int) => void): void;
}
