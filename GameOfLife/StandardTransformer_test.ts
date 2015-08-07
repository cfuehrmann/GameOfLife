import StandardTransformer = require("StandardTransformer");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

let method: string;
let name = (testCase: string) => "StandardTransformer, " + method + ": " + testCase;


method = "create";

test(name("survivalCondition when undefined or null"),
    checkDefinedAndNotNullAssert("survivalCondition",
    (survivalCondition: number[]) => StandardTransformer.create(survivalCondition, [0]))
);

test(name("birthCondition when undefined or null"),
    checkDefinedAndNotNullAssert("birthCondition",
    (birthCondition: number[]) => StandardTransformer.create([0], birthCondition))
);


// in principle, there should be more tests here