export interface Seq<T> {
    For(body: (i: T) => void): void;
}
export declare class Int {
    private value;
    constructor(value: number);
    public getValue(): number;
}
export declare class IntRange implements Seq<Int> {
    private count;
    private a;
    constructor(count: Int);
    public For(body: (i: Int) => void): void;
}
