/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "ArgumentException";


method = "constructor";

// no point in testing that the constructors argument is not checked


method = "getArgumentName";

check("result", () => {
    var e = new ArgumentException("foo");

    strictEqual(e.getArgumentName(), "foo");
});


method = "toString";

check("containsArgumentName", () => {
    var e = new ArgumentException("foo");

    ok(e.toString().indexOf("foo") > -1);
});


check("containsArgumentNameWhenNull", () => {
    var e = new ArgumentException(null);

    ok(e.toString().indexOf("null") > -1);
});

check("containsArgumentNameWhenUndefined", () => {
    var e = new ArgumentException("undefined");

    ok(e.toString().indexOf("undefined") > -1);
});
