define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    function assertInt(argumentName, value) {
        if (value % 1 !== 0 || value == null) {
            throw new ArgumentException(argumentName);
        }
    }
    exports.assertInt = assertInt;
    function assertReal(argumentName, value) {
        if (!isFinite(value) || value == null) {
            throw new ArgumentException(argumentName);
        }
    }
    exports.assertReal = assertReal;
    function checkIntAssert(argumentName, method) {
        return function () {
            checkRealAssert(argumentName, method)();
            throws(function () { return method(0.5); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.checkIntAssert = checkIntAssert;
    function checkRealAssert(argumentName, method) {
        return function () {
            throws(function () { return method(null); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(undefined); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(NaN); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return method(-Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.checkRealAssert = checkRealAssert;
});
