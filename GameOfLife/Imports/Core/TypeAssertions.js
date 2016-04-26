define(["require", "exports"], function (require, exports) {
    function assertInt(argumentName, testee) {
        return function () {
            assertReal(argumentName, testee)();
            throws(function () { return testee(0.5); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertInt = assertInt;
    function assertReal(argumentName, testee) {
        return function () {
            assertDefinedAndNotNull(argumentName, testee)();
            throws(function () { return testee(NaN); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return testee(Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return testee(-Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertReal = assertReal;
    function assertDefinedAndNotNull(argumentName, testee) {
        return function () {
            throws(function () { return testee(null); }, function (e) { return e.getArgumentName() === argumentName; });
            throws(function () { return testee(undefined); }, function (e) { return e.getArgumentName() === argumentName; });
        };
    }
    exports.assertDefinedAndNotNull = assertDefinedAndNotNull;
});
