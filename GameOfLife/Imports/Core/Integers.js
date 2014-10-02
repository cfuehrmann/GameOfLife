define(["require", "exports", "./Exceptions"], function(require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;

    var Int = (function () {
        function Int(value) {
            if (value % 1 !== 0) {
                throw new ArgumentException("value");
            }
            this.value = value;
        }
        Int.prototype.getRange = function () {
            return new IntRange(this);
        };

        Int.prototype.getValue = function () {
            return this.value;
        };
        return Int;
    })();
    exports.Int = Int;

    var IntRange = (function () {
        function IntRange(count) {
            this.count = count.getValue();
            this.a = new Array();
            for (var i = 0; i < count.getValue(); i++) {
                this.a.push(new Int(i));
            }
        }
        IntRange.prototype.For = function (body) {
            for (var i = 0; i < this.count; i++) {
                body(this.a[i]);
            }
        };
        return IntRange;
    })();
});
