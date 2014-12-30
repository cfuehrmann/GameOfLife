/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
import int = Integers.int;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "Int";
method = "int";

check("valueUndefined", () => {
    throws(() => int(undefined),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

check("valueNull", () => {
    throws(() => int(null),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

check("valueNonInteger", () => {
    throws(() => int(0.5),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

check("valueInfinity", () => {
    throws(() => int(Infinity),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

check("valueMinusInfinity", () => {
    throws(() => int(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

check("valueNaN", () => {
    throws(() => int(NaN),
        (e: ArgumentException) => e.getArgumentName() === "value",
        "No ArgumentException with argument name 'value' is thrown");
});

method = "getValue";

check("correctValue", () => {
    strictEqual(int(-42).getValue(), -42);
});

method = "each";

check("oneLoop", () => {
    var calls: Number[] = [];

    int(7).each(i => calls.push(i.getValue()));

    strictEqual(calls.length, 7);
    for (var j = 0; j < 7; j++) {
        strictEqual(calls[j], j);
    }
});

check("nested", () => {
    var calls: [number, number][] = [];

    int(5).each(i =>
        int(7).each(j => {
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

check("IntZero", () => {
    var bodyHasBeenCalled: boolean = false;

    int(0).each(_ => bodyHasBeenCalled = true);

    strictEqual(bodyHasBeenCalled, false);
});

check("IntNegative", () => {
    var bodyHasBeenCalled: boolean = false;

    int(-42).each(_=> bodyHasBeenCalled = true);

    strictEqual(bodyHasBeenCalled, false);
});

check("bodyNull", () => {
    throws(() => int(42).each(null),
        (e: ArgumentException) => e.getArgumentName() === "body",
        "No ArgumentException with argument name 'width' is thrown"
        );
});

check("bodyUndefined", () => {
    throws(() => int(42).each(undefined),
        (e: ArgumentException) => e.getArgumentName() === "body",
        "No ArgumentException with argument name 'width' is thrown"
        );
});

check("bodyThrows", () => {
    var calls: Number[] = [];

    throws(() => int(42).each(x => {
        if (x.getValue() === 3) {
            throw "foo";
        } else {
            calls.push(x.getValue());
        }
    }), "foo", "The exception from the body is not propagated!");

    strictEqual(calls.length, 3);
    for (var j = 0; j < 3; j++) {
        strictEqual(calls[j], j);
    }
});

check("performance1", () => {
    int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

check("performance2", () => {
    int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

check("performance3", () => {
    int(1000000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});
