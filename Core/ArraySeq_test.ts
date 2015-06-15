﻿/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Sequences = require("Sequences");
import TypeChecking = require("TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("Sequences, " + method + ": " + testCase, testBody);
}

method = "constructor";

check("Argument is defined",
    checkDefinedAndNotNullAssert("seq",(seq: number[]) => new Sequences.ArraySeq(seq))
    );

method = "filter";

check("Argument is defined",() => {
    var a = new Sequences.ArraySeq(new Array<number>());
    checkDefinedAndNotNullAssert("condition", a.filter)();
});

check("Filter works",() => {
    var a = new Sequences.ArraySeq([1, 2, 3, 4]);

    var result = a.filter(n => [2, 4].indexOf(n) >= 0).toArray();

    deepEqual(result, [2, 4]);
});
