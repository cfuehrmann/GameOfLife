import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
import Interface = require("./Interface");
import Scene = Interface.Scene;
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;

export class ArrayScene implements Scene {
    private array: Array<Array<boolean>>;
    private _width: Int;
    private _height: Int;

    constructor(public width: Int, public height: Int) {
        var w = width.getValue();
        if (w <= 0) {
            throw new ArgumentException("width");
        }
        var h = height.getValue();
        if (h <= 0) {
            throw new ArgumentException("height");
        }

        this._width = width;
        this._height = height;

        this.array = [];
        for (var x = 0; x < w; x++) {
            this.array[x] = [];
            for (var y = 0; y < h; y++) {
                this.array[x][y] = false;
            }
        }
    }

    setPoint(x: Int, y: Int, value: boolean) {
        this.array[x.getValue()][y.getValue()] = value;
    }

    // getPointUnsafe(x: number, y: number): boolean {
    //    if (x % 1 !== 0) {
    //        throw new ArgumentException("x");
    //    }
    //    if (y % 1 !== 0) {
    //        throw new ArgumentException("y");
    //    }
    //    return this.array[x][y];
    // }

    getPoint(x: Int, y: Int): boolean {
        return this.array[x.getValue()][y.getValue()];
    }

    getWidth(): Int {
        return this._width;
    }

    getHeight(): Int {
        return this._height;
    }
}

