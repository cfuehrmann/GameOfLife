import Integers = require("./Integers");
export declare class Array2D {
    width: Integers.Int;
    height: Integers.Int;
    private matrix;
    private _width;
    private _height;
    private w;
    private h;
    constructor(width: Integers.Int, height: Integers.Int);
    set(x: Integers.Int, y: Integers.Int, value: boolean): void;
    get(x: Integers.Int, y: Integers.Int): boolean;
    getWidth(): Integers.Int;
    getHeight(): Integers.Int;
}
