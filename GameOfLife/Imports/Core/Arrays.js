define(["require", "exports", "Exceptions", "TypeChecks"], function (require, exports, Exceptions_1, TypeChecks_1) {
    var Array2D = (function () {
        function Array2D(height, width, initialValue) {
            this.height = height;
            this.width = width;
            TypeChecks_1.checkInt("height", height);
            TypeChecks_1.checkInt("width", width);
            if (width <= 0) {
                throw new Exceptions_1.ArgumentException("width");
            }
            if (height <= 0) {
                throw new Exceptions_1.ArgumentException("height");
            }
            this.matrix = new Array();
            for (var row = 0; row < height; row++) {
                this.matrix[row] = new Array();
                for (var column = 0; column < width; column++) {
                    this.matrix[row][column] = initialValue;
                }
            }
        }
        Array2D.prototype.set = function (row, column, value) {
            TypeChecks_1.checkInt("row", row);
            TypeChecks_1.checkInt("column", column);
            if (row < 0 || row >= this.height) {
                throw new Exceptions_1.ArgumentException("row");
            }
            if (column < 0 || column >= this.width) {
                throw new Exceptions_1.ArgumentException("column");
            }
            this.matrix[row][column] = value;
        };
        Array2D.prototype.get = function (row, column) {
            TypeChecks_1.checkInt("row", row);
            TypeChecks_1.checkInt("column", column);
            if (row < 0 || row >= this.height) {
                throw new Exceptions_1.ArgumentException("row");
            }
            if (column < 0 || column >= this.width) {
                throw new Exceptions_1.ArgumentException("column");
            }
            return this.matrix[row][column];
        };
        return Array2D;
    })();
    exports.Array2D = Array2D;
});
