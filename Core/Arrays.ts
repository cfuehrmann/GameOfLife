/* tslint:disable no-unused-variable*/
import Integers = require("./Integers");
import Int = Integers.Int;
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Array2D {
    private matrix: Array<Array<boolean>>;
    private _width: Int;
    private _height: Int;
    private w: number;
    private h: number;
    private ints: Int[] = [];

    constructor(public width: Int, public height: Int) {
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
                this.matrix[x][y] = false;
            }
        }
    }

    set(x: Int, y: Int, value: boolean) {
        this.matrix[x.getValue()][y.getValue()] = value;
    }

    get(x: Int, y: Int): boolean {
        return this.matrix[x.getValue()][y.getValue()];
    }

    getWidth(): Int {
        return this._width;
    }

    getHeight(): Int {
        return this._height;
    }

    each(body: (x: Int, y: Int) => void): void {
        if (this.ints.length === 0) {
            for (var i = 0; i < Math.max(this.w, this.h); i++) {
                this.ints.push(new Int(i));
            }
        }

        for (var i2 = 0; i2 < this.w; i2++) {
            for (var j = 0; j < this.h; j++) {
                body(this.ints[i2], this.ints[j]);
            }
        }
    }
}

