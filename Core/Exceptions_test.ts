/// <reference path="Imports/QUnit/qunit.d.ts" />

import Exceptions = require('Exceptions');
import ArgumentException = Exceptions.ArgumentException;

QUnit.module("Foo");

test("FooTest", () => {
    var e = new ArgumentException("foo");
    strictEqual(e.getArgumentName(), "foo");
});
