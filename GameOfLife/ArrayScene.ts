import Integers = require('Int');
import Int = Integers.Int;
import XXX = require('IScene');
import IScene = XXX.IScene;
import ZZZ = require('ArgumentException');
import ArgumentException = ZZZ.ArgumentException;

export class ArrayScene implements IScene {
    private array: Array<Array<boolean>>;

    constructor(public width: number, public height: number) {
        if (width % 1 !== 0 || width <= 0) {
            throw new ArgumentException("width");
        }
        if (height % 1 !== 0 || height <= 0) {
            throw new ArgumentException("height");
        }
        this.array = [];
        for (var x = 0; x < width; x++) {
            this.array[x] = [];
            for (var y = 0; y < height; y++) {
                this.array[x][y] = false;
            }
        }
    }

    setPoint(x: number, y: number, value: boolean) {
        if (x % 1 !== 0) {
            throw new ArgumentException("x");
        }
        if (y % 1 !== 0) {
            throw new ArgumentException("y");
        }
        this.array[x][y] = value;
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
}

