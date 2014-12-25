define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    var Int = (function () {
        function Int(value) {
            if (value % 1 !== 0) {
                throw new ArgumentException("value");
            }
            this.value = value;
        }
        Int.prototype.getValue = function () {
            return this.value;
        };
        Int.prototype.each = function (body) {
            for (var j = Int.range.length; j < this.value; j++) {
                Int.range.push(new Int(j));
            }
            for (var i = 0; i < this.value; i++) {
                body(Int.range[i]);
            }
        };
        Int.range = [];
        return Int;
    })();
    exports.Int = Int;
});
