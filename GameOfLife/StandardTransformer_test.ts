/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import StandardTransformer = require("StandardTransformer");
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "StandardTransformer";


method = "create";

check("survivalCondition is null", () => {
    throws(() => StandardTransformer.create(null, []),
        (e: ArgumentException) => e.getArgumentName() === "survivalCondition");
});

check("survivalCondition is undefined", () => {
    throws(() => StandardTransformer.create(undefined, []),
        (e: ArgumentException) => e.getArgumentName() === "survivalCondition");
});

check("birthCondition is null", () => {
    throws(() => StandardTransformer.create([], null),
        (e: ArgumentException) => e.getArgumentName() === "birthCondition");
});

check("birthCondition is undefined", () => {
    throws(() => StandardTransformer.create([], undefined),
        (e: ArgumentException) => e.getArgumentName() === "birthCondition");
});

// in principle, there should be more tests here