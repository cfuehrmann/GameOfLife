import CanvasPointMap = require("CanvasPointMap");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkIntAssert = TypeChecking.checkIntAssert;

let method: string;
let name = (testCase: string) => "CanvasPointMap, " + method + ": " + testCase;

method = "create";

test(name("height is integer"),
    checkIntAssert("height", height => CanvasPointMap.create(1, height))
);

test(name("width is integer"),
    checkIntAssert("width", width => CanvasPointMap.create(width, 1))
);

// todo: add more tests