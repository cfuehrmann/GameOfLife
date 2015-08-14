import CanvasPointMap = require("CanvasPointMap");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkIntAssert = TypeChecking.checkIntAssert;

let method: string;
let name = (testCase: string) => "CanvasPointMap, " + method + ": " + testCase;

method = "create";

test(name("height is integer"),
    checkIntAssert("height", height => CanvasPointMap.create(height, 1, 1))
);

test(name("width is integer"),
    checkIntAssert("width", width => CanvasPointMap.create(1, width, 1))
);

test(name("pointSize is integer"),
    checkIntAssert("pointSize", pointSize => CanvasPointMap.create(1, 1, pointSize))
    );

// todo: add more tests