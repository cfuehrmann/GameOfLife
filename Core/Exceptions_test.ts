/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

testClass = "ArgumentException";
method = "constructor";

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

check("ArgumentName", () => {
    var e = new ArgumentException("foo");
    strictEqual(e.getArgumentName(), "foo");
});
