import CanvasPointMap = require("CanvasPointMap");
import TypeChecking = require("Imports/Core/TypeChecking");
let method: string;
let name = (testCase: string) => "CanvasPointMap, " + method + ": " + testCase;

method = "create";

test(name("height is integer"),
    TypeChecking.checkIntAssert("height", height => CanvasPointMap.create(height, 1, 1))
);

test(name("width is integer"),
    TypeChecking.checkIntAssert("width", width => CanvasPointMap.create(1, width, 1))
);

test(name("pointSize is integer"),
    TypeChecking.checkIntAssert("pointSize", pointSize => CanvasPointMap.create(1, 1, pointSize))
);