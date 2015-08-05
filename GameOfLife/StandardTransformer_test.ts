/* tslint:disable no-unused-variable*/
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
        (survivalCondition: number[]) => StandardTransformer.create(survivalCondition, [0]))
    );

check("birthCondition when undefined or null",
    checkDefinedAndNotNullAssert("birthCondition",
        (birthCondition: number[]) => StandardTransformer.create([0], birthCondition))
    );


// in principle, there should be more tests here