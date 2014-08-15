/// <reference path="Imports/QUnit/qunit.d.ts" />

import Integers = require('Integers');
import Int = Integers.Int;
import Exceptions = require('Exceptions');
import ArgumentException = Exceptions.ArgumentException;

QUnit.module("Foo");

test("FooTest", () => {
    throws(() => new Int(0.5),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "An ArgumentException with argument name 'value' is thrown"
        )
});