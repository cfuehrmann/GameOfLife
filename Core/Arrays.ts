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

        this.matrix = [];
        for (var x = 0; x < w; x++) {
            this.matrix[x] = [];
            for (var y = 0; y < h; y++) {
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
}

