/* tslint:disable no-unused-variable*/
import Integers = require("./Integers");
import Int = Integers.Int;
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Array2D<T> {
    private matrix: T[][];
    private _width: Int;
    private _height: Int;
    private w: number;
    private h: number;

    constructor(width: Int, height: Int, initialValue: T) {
        if (width == null || typeof (width) === "undefined") {
            throw new ArgumentException("width");
        }
        if (height == null || typeof (height) === "undefined") {
            throw new ArgumentException("height");
        }
        if (initialValue == null || typeof (initialValue) === "undefined") {
            throw new ArgumentException("initialValue");
        }
        this.w = width.getValue();
        if (this.w <= 0) {
            throw new ArgumentException("width");
        }
        this.h = height.getValue();
        if (this.h <= 0) {
            throw new ArgumentException("height");
        }

        this._width = width;
        this._height = height;

        this.matrix = [];
        for (var x = 0; x < this.w; x++) {
            this.matrix[x] = [];
            for (var y = 0; y < this.h; y++) {
                this.matrix[x][y] = initialValue;
            }
        }
    }

    set(x: Int, y: Int, value: T) {
        if (x == null || typeof (x) === "undefined") {
            throw new ArgumentException("x");
        }
        if (y == null || typeof (y) === "undefined") {
            throw new ArgumentException("y");
        }
        if (value == null || typeof (value) === "undefined") {
            throw new ArgumentException("value");
        }

        this.matrix[x.getValue()][y.getValue()] = value;
    }

    get(x: Int, y: Int): T {
        if (x == null || typeof (x) === "undefined") {
            throw new ArgumentException("x");
        }
        if (y == null || typeof (y) === "undefined") {
            throw new ArgumentException("y");
        }

        return this.matrix[x.getValue()][y.getValue()];
    }

    getWidth(): Int {
        return this._width;
    }

    getHeight(): Int {
        return this._height;
    }
}