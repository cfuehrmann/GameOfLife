define(["require", "exports", "./Integers", "./Exceptions"], function(require, exports, Integers, Exceptions) {
    var Int = Integers.Int;

    var ArgumentException = Exceptions.ArgumentException;

    var Array2D = (function () {
        function Array2D(width, height) {
            var w = width.getValue();
            if (w <= 0) {
                throw new ArgumentException("width");
            }
            var h = height.getValue();
            if (h <= 0) {
                throw new ArgumentException("height");
            }

            this.width = width;
            this.height = height;

            this.isRangeEmpty = true;

            this.elements = [];
            for (var i = 0; i < w; i++) {
                this.elements[i] = [];
                for (var j = 0; j < h; j++) {
                    this.elements[i][j] = false;
                }
            }
        }
        Array2D.prototype.set = function (i, j, value) {
            this.elements[i.getValue()][j.getValue()] = value;
        };

        Array2D.prototype.get = function (i, j) {
            return this.elements[i.getValue()][j.getValue()];
        };

        Array2D.prototype.getWidth = function () {
            return this.width;
        };

        Array2D.prototype.getHeight = function () {
            return this.height;
        };

        Array2D.prototype.each = function (body) {
            if (this.isRangeEmpty) {
                this.ints = [];
                var w = this.width.getValue();
                var h = this.height.getValue();
                var max = Math.max(w, h);
                for (var n = 0; n < max; n++) {
                    this.ints.push(new Int(n));
                }
            }
            for (var i = 0; i < w; i++) {
                for (var j = 0; j < h; j++) {
                    body(this.ints[i], this.ints[j]);
                }
            }
        };
        return Array2D;
    })();
    exports.Array2D = Array2D;
});
