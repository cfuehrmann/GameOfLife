import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
import EagerRange = Integers.EagerRange;
import Interface = require("./Interface");
import Scene = Interface.Scene;
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;

export class ArrayScene implements Scene {
    private matrix: Array<Array<boolean>>;
    private _width: Int;
    private _height: Int;
    private xRange: EagerRange;
    private yRange: EagerRange;

    constructor(public width: Int, public height: Int) {
        var w = width.getValue();
        if (w <= 0) {
            throw new ArgumentException("width");
        }
        var h = height.getValue();
        if (h <= 0) {
            throw new ArgumentException("height");
        }

        this.xRange = new EagerRange(width);
        this.yRange = new EagerRange(height);

        this._width = width;
        this._height = height;

        this.matrix = [];
        this.xRange.For(x => {
            var xv = x.getValue();
            this.matrix[xv] = [];
            this.yRange.For(y => { this.matrix[xv][y.getValue()] = false; });
        });
    }

    setPoint(x: Int, y: Int, value: boolean) {
        this.matrix[x.getValue()][y.getValue()] = value;
    }

    getPoint(x: Int, y: Int): boolean {
        return this.matrix[x.getValue()][y.getValue()];
    }

    getWidth(): Int {
        return this._width;
    }

    getHeight(): Int {
        return this._height;
    }
}

