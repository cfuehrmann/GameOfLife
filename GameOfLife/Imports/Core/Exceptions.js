define(["require", "exports"], function (require, exports) {
    var ArgumentException = (function () {
        function ArgumentException(argumentName) {
            this.argumentName = argumentName;
        }
        ArgumentException.prototype.getArgumentName = function () {
            return this.argumentName;
        };
        return ArgumentException;
    })();
    exports.ArgumentException = ArgumentException;
});
