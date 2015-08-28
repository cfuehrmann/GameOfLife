import GameOfLifeTransformer = require("GameOfLifeTransformer");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

let method: string;
let name = (testCase: string) => "GameOfLifeTransformer, " + method + ": " + testCase;


method = "create";

test(name("survivalCondition when undefined or null"),
    checkDefinedAndNotNullAssert("survivalCondition",
    (survivalCondition: number[]) => GameOfLifeTransformer.create(survivalCondition, [0]))
);

test(name("birthCondition when undefined or null"),
    checkDefinedAndNotNullAssert("birthCondition",
    (birthCondition: number[]) => GameOfLifeTransformer.create([0], birthCondition))
);


// todo: add more tests?