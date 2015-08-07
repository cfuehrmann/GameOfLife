import Arrays = require("Imports/Core/Arrays");
import Interface = require("Interfaces");
import StandardRenderer = require("StandardRenderer");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import PointMap = Interface.PointMap;
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "StandardRenderer";


method = "create";

check("pointMap when undefined or null",
    checkDefinedAndNotNullAssert("pointMap", (pointMap: PointMap<number>) => StandardRenderer.create(pointMap))
);


method = "render";

check("world when undefined or null", () => {
    var r = StandardRenderer.create(new TestPointMap());

    checkDefinedAndNotNullAssert("world", (world: Array2D<number>) => r.render(world))();
});


check("PointMapCallSequence", () => {
    var pointMap = new TestPointMap();
    var renderer = StandardRenderer.create(pointMap);
    var width = 5;
    var height = 7;
    var scene = new Array2D(height, width, 0);
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            scene.set(row, column, row * width + column);
        }
    }
    var drawnPoints = new Array2D(height, width, false);

    renderer.render(scene);

    strictEqual(pointMap.calls.length, 1 + width * height);
    ok(pointMap.calls[0].match({
        clear: () => true,
        drawPoint: (row, column, value) => false
    }));
    for (let i = 1; i < 1 + width * height; i++) {
        pointMap.calls[i].match({
            clear: () => ok(false),
            drawPoint: (row, column, value) => {
                strictEqual(value, scene.get(row, column));
                if (drawnPoints.get(row, column)) {
                    ok(false);
                } else {
                    drawnPoints.set(row, column, true);
                }
            }
        });
    }
});

// We refrain from testing that exceptions in the PointMap methods are propagated,
// since it would take criminal energy to keep them from propagating

class TestPointMap implements PointMap<number> {
    calls: PointMapCall<number>[];

    constructor() {
        this.calls = new Array<PointMapCall<number>>(); // <PointMapCall<number>[]>
    }

    clear() {
        this.calls.push(new Clear());
    }

    drawPoint(row: number, column: number, value: number) {
        this.calls.push(new DrawPoint(row, column, value));
    }

    node: any;
}

interface PointMapCall<TPoint> {
    match<TResult>(cases: PointMapCallCases<TResult, TPoint>): TResult;
}

interface PointMapCallCases<TResult, TPoint> {
    clear(): TResult;
    drawPoint(row: number, column: number, value: TPoint): TResult;
}

class Clear<TResult, TPoint> implements PointMapCall<TPoint> {
    match<T>(cases: PointMapCallCases<T, TPoint>) {
        return cases.clear();
    }
}

class DrawPoint<TResult, TPoint> implements PointMapCall<TPoint> {
    constructor(private row: number, private column: number, private value: TPoint) {}

    match<T>(cases: PointMapCallCases<T, TPoint>) {
        return cases.drawPoint(this.row, this.column, this.value);
    }
}