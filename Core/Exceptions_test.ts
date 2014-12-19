/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

QUnit.module("Foo");

test("FooTest", () => {
    var e = new ArgumentException("foo");
    strictEqual(e.getArgumentName(), "foo");
});
