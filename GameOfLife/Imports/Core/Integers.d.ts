export interface IntSeq {
    For(body: (i: Int) => void): void;
}
export declare class Int {
    private value;
    constructor(value: number);
    public getValue(): number;
}
export declare class IntRange implements IntSeq {
    private count;
    private a;
    constructor(count: Int);
    public For(body: (i: Int) => void): void;
}
