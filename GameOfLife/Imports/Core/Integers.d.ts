import Sequences = require("./Sequences");
export declare class Int {
    private value;
    constructor(value: number);
    public getValue(): number;
    public each(body: (x: Int) => void): void;
}
export declare class EagerRange implements Sequences.Seq<Int> {
    private count;
    private a;
    constructor(count: Int);
    public For(body: (i: Int) => void): void;
}
