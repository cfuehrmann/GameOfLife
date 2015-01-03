﻿/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Num = require("Numbers");
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("Integers, " + method + ": " + testCase, testBody);
}

method = "mod";

check("numerator is null", () =>
    throws(() => Num.mod(null, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is undefined", () =>
    throws(() => Num.mod(undefined, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is NaN", () =>
    throws(() => Num.mod(NaN, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is Infinity", () =>
    throws(() => Num.mod(Infinity, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is -Infinity", () =>
    throws(() => Num.mod(-Infinity, 1),
        (e: ArgumentException) => e.getArgumentName() === "numerator")
    );

check("numerator is non-integer real", () =>
    strictEqual(Num.mod(7.5, 5), 2.5)
    );

check("numerator is negative", () =>
    strictEqual(Num.mod(-2, 5), 3)
    );


check("denominator is null", () =>
    throws(() => Num.mod(1, null),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is undefined", () =>
    throws(() => Num.mod(1, undefined),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is NaN", () =>
    throws(() => Num.mod(1, NaN),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is Infinity", () =>
    throws(() => Num.mod(1, Infinity),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is -Infinity", () =>
    throws(() => Num.mod(1, -Infinity),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("denominator is 0", () =>
    throws(() => Num.mod(1, 0),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("numerator positive real and denominator positive real", () =>
    strictEqual(Num.mod(7.3, 2.5), 2.3)
    );

check("numerator negative real and denominator positive real", () =>
    strictEqual(Num.mod(-4, 3), 2)
    );

check("numerator positive real and denominator negative real", () =>
    strictEqual(Num.mod(5, -3), 2)
    );


method = "isNoInt";

check("null", () => ok(Num.isNoInt(null)));

check("undefined", () => ok(Num.isNoInt(undefined)));

check("NaN", () => ok(Num.isNoInt(NaN)));

check("Infinity", () => ok(Num.isNoInt(Infinity)));

check("-Infinity", () => ok(Num.isNoInt(-Infinity)));

check("non-Integer real", () => ok(Num.isNoInt(2.5)));

check("negative integer", () => ok(!Num.isNoInt(-42)));

check("positive integer", () => ok(!Num.isNoInt(42)));