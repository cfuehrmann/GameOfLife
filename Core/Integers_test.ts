/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
import EagerRange = Integers.EagerRange;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

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

test("each", () => {
    var calls: Array<Number> = new Array<Number>();
    function body(i: Int) {
        calls.push(i.getValue());
    }
    var i = new Int(42);

    i.each(body);

    strictEqual(calls.length, 42);
    for (var j = 0; j < 42; j++) {
        strictEqual(calls[j], j);
    }
});

test("eachWhenBodyThrows", () => {
    var calls: Array<Number> = new Array<Number>();
    function body(x: Int) {
        if (x.getValue() === 3) {
            throw "foo";
        } else {
            calls.push(x.getValue());
        }
    }
    var i = new Int(42);

    throws(() => i.each(body), "foo", "The exception from the body is not propagated!");

    strictEqual(calls.length, 3);
    for (var j = 0; j < 3; j++) {
        strictEqual(calls[j], j);
    }
});

test("eachOnZero", () => {
    var bodyHasBeenCalled: boolean = false;
    function body(x: Int) {
        bodyHasBeenCalled = true;
    }
    var i = new Int(0);

    i.each(body);

    strictEqual(bodyHasBeenCalled, false);
});

test("eachOnNegative", () => {
    var bodyHasBeenCalled: boolean = false;
    function body(x: Int) {
        bodyHasBeenCalled = true;
    }
    var i = new Int(-42);

    i.each(body);

    strictEqual(bodyHasBeenCalled, false);
});


QUnit.module("EagerRange");

test("ConstructorWithNegativeArgument", () => {
    throws(() => new EagerRange(new Int(-1)),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

test("For", () => {
    var calls: Array<Number> = new Array<Number>();
    function body(i: Int) {
        calls.push(i.getValue());
    }
    var range = new EagerRange(new Int(42));

    range.For(body);

    strictEqual(calls.length, 42);
    for (var i = 0; i < 42; i++) {
        strictEqual(calls[i], i);
    }
});

test("ForWhenBodyThrows", () => {
    var calls: Array<Number> = new Array<Number>();
    function body(i: Int) {
        if (i.getValue() === 3) {
            throw "foo";
        } else {
            calls.push(i.getValue());
        }
    }
    var range = new EagerRange(new Int(42));

    throws(() => range.For(body), "foo", "The exception from the body is not propagated!");

    strictEqual(calls.length, 3);
    for (var i = 0; i < 3; i++) {
        strictEqual(calls[i], i);
    }
});

test("ForOnZeroRange", () => {
    var bodyHasBeenCalled: boolean = false;
    function body(i: Int) {
        bodyHasBeenCalled = true;
    }
    var range = new EagerRange(new Int(0));

    range.For(body);

    strictEqual(bodyHasBeenCalled, false);
});


