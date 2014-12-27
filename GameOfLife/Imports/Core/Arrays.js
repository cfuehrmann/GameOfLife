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
        Array2D.prototype.set = function (x, y, value) {
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
        };
        Array2D.prototype.get = function (x, y) {
            if (x == null || typeof (x) === "undefined") {
                throw new ArgumentException("x");
            }
            if (y == null || typeof (y) === "undefined") {
                throw new ArgumentException("y");
            }
            return this.matrix[x.getValue()][y.getValue()];
        };
        Array2D.prototype.getWidth = function () {
            return this._width;
        };
        Array2D.prototype.getHeight = function () {
            return this._height;
        };
        return Array2D;
    })();
    exports.Array2D = Array2D;
});
