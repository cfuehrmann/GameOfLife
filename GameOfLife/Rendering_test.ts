/// <reference path="Imports/QUnit/qunit.d.ts" />

import Exceptions = require("Imports/Core/Exceptions");

QUnit.module("Renderer constructor");

test("Bla", () => {
    var a = new Exceptions.ArgumentException("foo");
    strictEqual(a, a);
});
