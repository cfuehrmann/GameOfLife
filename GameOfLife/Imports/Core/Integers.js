define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    var Int = (function () {
        function Int(value) {
            if (value % 1 !== 0 || value == null) {
                throw new ArgumentException("value");
            }
            this.value = value;
        }
        Int.prototype.getValue = function () {
            return this.value;
        };
        Int.prototype.each = function (body) {
            if (body == null || typeof body === "undefined") {
                throw new ArgumentException("body");
            }
            for (var j = Int.range.length; j < this.value; j++) {
                Int.range.push(new Int(j));
            }
            for (var i = 0; i < this.value; i++) {
                body(Int.range[i]);
            }
        };
        Int.prototype.mod = function (n) {
            var nv = n.getValue();
            return new Int(((this.value % nv) + nv) % nv);
        };
        Int.prototype.minus = function (n) {
            return new Int(this.value - n.getValue());
        };
        Int.prototype.pred = function () {
            return new Int(this.value - 1);
        };
        Int.prototype.succ = function () {
            return new Int(this.value + 1);
        };
        Int.range = [];
        return Int;
    })();
    exports.Int = Int;
});
