import Integers = require("./Integers");
export declare class Array2D {
    private elements;
    private width;
    private height;
    private ints;
    private isRangeEmpty;
    constructor(width: Integers.Int, height: Integers.Int);
    public set(i: Integers.Int, j: Integers.Int, value: boolean): void;
    public get(i: Integers.Int, j: Integers.Int): boolean;
    public getWidth(): Integers.Int;
    public getHeight(): Integers.Int;
    public each(body: (i: Integers.Int, j: Integers.Int) => void): void;
}
