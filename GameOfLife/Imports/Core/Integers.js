define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    var range = [];
    function int(value) {
        var result = range[value];
        if (typeof result === "undefined") {
            result = new PrivateInt(value);
            range[value] = result;
        }
        return result;
    }
    exports.int = int;
    var PrivateInt = (function () {
        function PrivateInt(value) {
            this.value = value;
            if (value % 1 !== 0 || value == null) {
                throw new ArgumentException("value");
            }
            this.value = value;
        }
        PrivateInt.prototype.getValue = function () {
            return this.value;
        };
        PrivateInt.prototype.each = function (body) {
            if (body == null || typeof body === "undefined") {
                throw new ArgumentException("body");
            }
            for (var i = 0; i < this.value; i++) {
                body(int(i));
            }
        };
        PrivateInt.prototype.mod = function (n) {
            var nv = n.getValue();
            return new PrivateInt(((this.value % nv) + nv) % nv);
        };
        PrivateInt.prototype.minus = function (n) {
            return new PrivateInt(this.value - n.getValue());
        };
        PrivateInt.prototype.pred = function () {
            return new PrivateInt(this.value - 1);
        };
        PrivateInt.prototype.succ = function () {
            return new PrivateInt(this.value + 1);
        };
        return PrivateInt;
    })();
});
