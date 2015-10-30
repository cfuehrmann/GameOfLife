define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    function checkInt(argumentName, value) {
        if (value % 1 !== 0 || value == null) {
            throw new ArgumentException(argumentName);
        }
    }
    exports.checkInt = checkInt;
    function checkReal(argumentName, value) {
        if (!isFinite(value) || value == null) {
            throw new ArgumentException(argumentName);
        }
    }
    exports.checkReal = checkReal;
    function checkDefinedAndNotNull(argumentName, value) {
        if (typeof (value) === "undefined" || value == null) {
            throw new ArgumentException(argumentName);
        }
    }
    exports.checkDefinedAndNotNull = checkDefinedAndNotNull;
});
