import Integers = require("./Integers");
export declare class Array2D<T> {
    private matrix;
    private width;
    private height;
    private w;
    private h;
    constructor(height: Integers.Int, width: Integers.Int, initialValue: T);
    set(row: Integers.Int, column: Integers.Int, value: T): void;
    get(row: Integers.Int, column: Integers.Int): T;
    getWidth(): Integers.Int;
    getHeight(): Integers.Int;
}
