/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Sequences = require("Sequences");
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import TypeChecking = require("TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
/* tslint:enable no-unused-variable*/

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("Sequences, " + method + ": " + testCase, testBody);
}

method = "Constructor";

check("Argument is defined",
    checkDefinedAndNotNullAssert("seq", seq => new Sequences.ArraySeq(seq))
    );

