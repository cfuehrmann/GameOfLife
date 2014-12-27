﻿/* tslint:disable no-unused-variable*/
import Integers = require("./Integers");
import Int = Integers.Int;
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Array2D<T> {
    private matrix: T[][];
    private width: Int;
    private height: Int;
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

        this.width = width;
        this.height = height;

        this.matrix = [];
        for (var row = 0; row < this.w; row++) {
            this.matrix[row] = [];
            for (var column = 0; column < this.h; column++) {
                this.matrix[row][column] = initialValue;
            }
        }
    }

    set(row: Int, column: Int, value: T) {
        if (row == null || typeof (row) === "undefined") {
            throw new ArgumentException("row");
        }
        if (column == null || typeof (column) === "undefined") {
            throw new ArgumentException("column");
        }
        if (value == null || typeof (value) === "undefined") {
            throw new ArgumentException("value");
        }

        this.matrix[row.getValue()][column.getValue()] = value;
    }

    get(row: Int, column: Int): T {
        if (row == null || typeof (row) === "undefined") {
            throw new ArgumentException("row");
        }
        if (column == null || typeof (column) === "undefined") {
            throw new ArgumentException("column");
        }

        return this.matrix[row.getValue()][column.getValue()];
    }

    getWidth(): Int {
        return this.width;
    }

    getHeight(): Int {
        return this.height;
    }
}