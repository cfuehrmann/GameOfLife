import Exceptions = require("./Exceptions");
import TypeChecking = require("./TypeChecking");
import ArgumentException = Exceptions.ArgumentException;
import assertInt = TypeChecking.assertInt;

export class Array2D<T> {
    private matrix: T[][];

    constructor(public height: number, public width: number, initialValue: T) {
        assertInt("height", height); assertInt("width", width);
        if (width <= 0) {
            throw new ArgumentException("width");
        }
        if (height <= 0) {
            throw new ArgumentException("height");
        }
        this.matrix = new Array<T[]>();
        for (let row = 0; row < height; row++) {
            this.matrix[row] = new Array<T>();
            for (let column = 0; column < width; column++) {
                this.matrix[row][column] = initialValue;
            }
        }
    }

    set(row: number, column: number, value: T) {
        assertInt("row", row); assertInt("column", column);
        if (row < 0 || row >= this.height) {
            throw new ArgumentException("row");
        }
        if (column < 0 || column >= this.width) {
            throw new ArgumentException("column");
        }
        this.matrix[row][column] = value;
    }

    get(row: number, column: number): T {
        assertInt("row", row); assertInt("column", column);
        if (row < 0 || row >= this.height) {
            throw new ArgumentException("row");
        }
        if (column < 0 || column >= this.width) {
            throw new ArgumentException("column");
        }
        return this.matrix[row][column];
    }
}