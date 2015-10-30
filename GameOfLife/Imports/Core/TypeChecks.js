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
    function assertInt(argumentName, method) {
        return function () {
            assertReal(argumentName, method)();
            throws(function () { return method(0.5); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertInt = assertInt;
    function assertReal(argumentName, method) {
        return function () {
            assertDefinedAndNotNull(argumentName, method)();
            throws(function () { return method(NaN); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(-Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertReal = assertReal;
    function assertDefinedAndNotNull(argumentName, method) {
        return function () {
            throws(function () { return method(null); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(undefined); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertDefinedAndNotNull = assertDefinedAndNotNull;
});
