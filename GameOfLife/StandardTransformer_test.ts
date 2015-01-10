/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import StandardTransformer = require("StandardTransformer");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "StandardTransformer";


method = "create";

check("survivalCondition when undefined or null",
    checkDefinedAndNotNullAssert("survivalCondition",
        survivalCondition => StandardTransformer.create(survivalCondition, []))
    );

check("birthCondition when undefined or null",
    checkDefinedAndNotNullAssert("birthCondition",
        birthCondition => StandardTransformer.create([], birthCondition))
    );


// in principle, there should be more tests here