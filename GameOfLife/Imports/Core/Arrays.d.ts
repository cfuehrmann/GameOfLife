import Integers = require("./Integers");
export declare class Array2D {
    public width: Integers.Int;
    public height: Integers.Int;
    private matrix;
    private _width;
    private _height;
    constructor(width: Integers.Int, height: Integers.Int);
    public set(x: Integers.Int, y: Integers.Int, value: boolean): void;
    public get(x: Integers.Int, y: Integers.Int): boolean;
    public getWidth(): Integers.Int;
    public getHeight(): Integers.Int;
}
