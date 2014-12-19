/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Imports/Core/Exceptions");
/* tslint:enable no-unused-variable*/

QUnit.module("Renderer constructor");

test("Bla", () => {
    var a = new Exceptions.ArgumentException("foo");
    strictEqual(a, a);
});
