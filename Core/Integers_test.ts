/// <reference path="Imports/QUnit/qunit.d.ts" />


import Integers = require("Integers");
import Int = Integers.Int;
import EagerRange = Integers.EagerRange;
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

test("ConstructorWithNaN", () => {
    throws(() => new Int(NaN),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

test("ConstructorWithNaN", () => {
    throws(() => new Int(NaN),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

test("getValue", () => {
    strictEqual(new Int(-42).getValue(), -42);
});


QUnit.module("EagerRange");

test("Constructor", () => {
    throws(() => new EagerRange(new Int(-1)),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});
