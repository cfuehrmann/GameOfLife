/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
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
    var calls: Number[] = [];

    new Int(7).each(i => calls.push(i.getValue()));

    strictEqual(calls.length, 7);
    for (var j = 0; j < 7; j++) {
        strictEqual(calls[j], j);
    }
});

test("eachNested", () => {
    var calls: [number, number][] = [];

    new Int(5).each(i =>
        new Int(7).each(j => {
            calls.push([i.getValue(), j.getValue()]);
        }));

    strictEqual(calls.length, 5 * 7);
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {
            strictEqual(calls[i * 7 + j][0], i);
            strictEqual(calls[i * 7 + j][1], j);
        }
    }
});

test("eachWhenBodyThrows", () => {
    var calls: Number[] = [];
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

test("eachPerformance1", () => {
    new Int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

test("eachPerformance2", () => {
    new Int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

test("eachPerformance3", () => {
    new Int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});
