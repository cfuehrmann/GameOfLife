/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Int = require("Integers");
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("Integers, " + method + ": " + testCase, testBody);
}

method = "mod";

check("numerator is null", () =>
    throws(() => Int.mod(null, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is undefined", () =>
    throws(() => Int.mod(undefined, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is NaN", () =>
    throws(() => Int.mod(NaN, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is Infinity", () =>
    throws(() => Int.mod(Infinity, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is -Infinity", () =>
    throws(() => Int.mod(-Infinity, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is non-integer real", () =>
    strictEqual(Int.mod(7.5, 5), 2.5)
    );

check("numerator is negative", () =>
    strictEqual(Int.mod(-2, 5), 3)
    );


check("denominator is null", () =>
    throws(() => Int.mod(1, null),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is undefined", () =>
    throws(() => Int.mod(1, undefined),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is NaN", () =>
    throws(() => Int.mod(1, NaN),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is Infinity", () =>
    throws(() => Int.mod(1, Infinity),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is -Infinity", () =>
    throws(() => Int.mod(1, -Infinity),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is 0", () =>
    throws(() => Int.mod(1, 0),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("numerator positive real and denominator positive real", () =>
    strictEqual(Int.mod(7.3, 2.5), 2.3)
    );

check("numerator negative real and denominator positive real", () =>
    strictEqual(Int.mod(-4, 3), 2)
    );

check("numerator positive real and denominator negative real", () =>
    strictEqual(Int.mod(5, -3), 2)
    );


method = "isNoInt";

check("null", () => ok(Int.isNoInt(null)));

check("undefined", () => ok(Int.isNoInt(undefined)));

check("NaN", () => ok(Int.isNoInt(NaN)));

check("Infinity", () => ok(Int.isNoInt(Infinity)));

check("-Infinity", () => ok(Int.isNoInt(-Infinity)));

check("non-Integer real", () => ok(Int.isNoInt(2.5)));

check("negative integer", () => ok(!Int.isNoInt(-42)));

check("positive integer", () => ok(!Int.isNoInt(42)));