define(["require", "exports"], function (require, exports) {
    "use strict";
    function assertInt(argumentName, testee) {
        assertReal(argumentName, testee);
        QUnit.assert.throws(function () { return testee(0.5); }, function (e) { return e.getArgumentName() === argumentName; });
    }
    exports.assertInt = assertInt;
    function assertReal(argumentName, testee) {
        assertDefinedAndNotNull(argumentName, testee);
        QUnit.assert.throws(function () { return testee(NaN); }, function (e) { return e.getArgumentName() === argumentName; });
        QUnit.assert.throws(function () { return testee(Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
        QUnit.assert.throws(function () { return testee(-Infinity); }, function (e) { return e.getArgumentName() === argumentName; });
    }
    exports.assertReal = assertReal;
    function assertDefinedAndNotNull(argumentName, testee) {
        QUnit.assert.throws(function () { return testee(null); }, function (e) { return e.getArgumentName() === argumentName; });
        QUnit.assert.throws(function () { return testee(undefined); }, function (e) { return e.getArgumentName() === argumentName; });
    }
    exports.assertDefinedAndNotNull = assertDefinedAndNotNull;
});
