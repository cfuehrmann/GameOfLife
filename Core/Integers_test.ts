/// <reference path="Imports/QUnit/qunit.d.ts" />

import Integers = require("Integers");
import Int = Integers.Int;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;

QUnit.module("Int");

test("ConstructorWithFiniteNonInteger", () => {
    throws(() => new Int(0.5),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

test("ConstructorWithInfinity", () => {
    throws(() => new Int(Infinity),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

test("ConstructorWithMinusInfinity", () => {
    throws(() => new Int(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});