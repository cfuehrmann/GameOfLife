define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    function from(array) {
        return new ArrayList(array);
    }
    exports.from = from;
    var ArrayList = (function () {
        function ArrayList(array) {
            this.array = array;
            if (typeof array === "undefined" || array == null) {
                throw new ArgumentException("array");
            }
        }
        ArrayList.prototype.fold = function (startValue, func) {
            if (typeof func === "undefined" || func == null) {
                throw new ArgumentException("func");
            }
            var result = startValue;
            for (var i = 0; i < this.array.length; i++) {
                result = func(result, this.array[i]);
            }
            return result;
        };
        ArrayList.prototype.map = function (func) {
            if (typeof func === "undefined" || func == null) {
                throw new ArgumentException("func");
            }
            var resultArray = [];
            for (var i = 0; i < this.array.length; i++) {
                resultArray.push(func(this.array[i]));
            }
            return new ArrayList(resultArray);
        };
        return ArrayList;
    })();
});
