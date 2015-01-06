/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Numbers = require("Numbers");
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import TypeChecking = require("TypeChecking");
import checkRealAssert = TypeChecking.checkRealAssert;
/* tslint:enable no-unused-variable*/

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("Numbers, " + method + ": " + testCase, testBody);
}

method = "mod";

check("numerator has real assert",
    checkRealAssert("numerator", numerator => Numbers.mod(numerator, 1))
    );

check("numerator is negative", () =>
    strictEqual(Numbers.mod(-2, 5), 3)
    );


check("denominator has real assert",
    checkRealAssert("denominator", denominator => Numbers.mod(1, denominator))
    );

check("denominator is 0", () =>
    throws(() => Numbers.mod(1, 0),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
    );

check("numerator positive real and denominator positive real", () =>
    strictEqual(Numbers.mod(7.3, 2.5), 2.3)
    );

check("numerator negative real and denominator positive real", () =>
    strictEqual(Numbers.mod(-4, 3), 2)
    );

check("numerator positive real and denominator negative real", () =>
    strictEqual(Numbers.mod(5, -3), 2)
    );
