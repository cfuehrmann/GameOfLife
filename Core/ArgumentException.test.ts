/// <reference path="Imports/QUnit/qunit.d.ts" />

import ZZZ = require('ArgumentException');
import ArgumentException = ZZZ.ArgumentException;

QUnit.module("Foo");

test("FooTest", () => {
    var e = new ArgumentException("foo");
    strictEqual(e.getArgumentName(), "foo");
});
