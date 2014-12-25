define(["require", "exports", "./Integers", "./Exceptions"], function (require, exports, Integers, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    var Array2D = (function () {
        function Array2D(width, height) {
            this.width = width;
            this.height = height;
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
        Array2D.prototype.set = function (x, y, value) {
            this.matrix[x.getValue()][y.getValue()] = value;
        };
        Array2D.prototype.get = function (x, y) {
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
