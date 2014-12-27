define(["require", "exports", "./Integers", "./Exceptions"], function (require, exports, Integers, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    var Array2D = (function () {
        function Array2D(width, height, initialValue) {
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
        Array2D.prototype.set = function (row, column, value) {
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
        };
        Array2D.prototype.get = function (row, column) {
            if (row == null || typeof (row) === "undefined") {
                throw new ArgumentException("row");
            }
            if (column == null || typeof (column) === "undefined") {
                throw new ArgumentException("column");
            }
            return this.matrix[row.getValue()][column.getValue()];
        };
        Array2D.prototype.getWidth = function () {
            return this.width;
        };
        Array2D.prototype.getHeight = function () {
            return this.height;
        };
        return Array2D;
    })();
    exports.Array2D = Array2D;
});
