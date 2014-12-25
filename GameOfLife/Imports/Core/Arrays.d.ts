import Integers = require("./Integers");
export declare class Array2D<T> {
    width: Integers.Int;
    height: Integers.Int;
    private matrix;
    private _width;
    private _height;
    private w;
    private h;
    constructor(width: Integers.Int, height: Integers.Int, initialValue: T);
    set(x: Integers.Int, y: Integers.Int, value: T): void;
    get(x: Integers.Int, y: Integers.Int): T;
    getWidth(): Integers.Int;
    getHeight(): Integers.Int;
}
