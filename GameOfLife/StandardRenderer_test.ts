import Arrays = require("Imports/Core/Arrays");
import Interface = require("Interfaces");
import StandardRenderer = require("StandardRenderer");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import PointMap = Interface.PointMap;
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

let method: string;
let name = (testCase: string) => "StandardRenderer, " + method + ": " + testCase;

method = "create";

test(name("pointMap when undefined or null"),
    checkDefinedAndNotNullAssert("pointMap", (pointMap: PointMap) => StandardRenderer.create(pointMap))
);


method = "render";

test(name("world when undefined or null"), () => {
    const r = StandardRenderer.create(new TestPointMap());

    checkDefinedAndNotNullAssert("world", (world: Array2D<boolean>) => r.render(world))();
});


test(name("PointMapCallSequence"), () => {
    // PREPARE

    const pointMap = new TestPointMap();
    const renderer = StandardRenderer.create(pointMap);
    const width = 5;
    const height = 3;
    const scene = new Array2D(height, width, false);

    scene.set(0, 0, true);
    scene.set(0, 1, false);
    scene.set(0, 2, true);
    scene.set(0, 3, false);
    scene.set(0, 4, true);

    scene.set(1, 0, false);
    scene.set(1, 1, true);
    scene.set(1, 2, false);
    scene.set(1, 3, true);
    scene.set(1, 4, false);

    scene.set(2, 0, true);
    scene.set(2, 1, false);
    scene.set(2, 2, true);
    scene.set(2, 3, false);
    scene.set(2, 4, true);

    // ACT
    renderer.render(scene);

    // ASSERT 
    strictEqual(pointMap.calls.length, 1 + 8);
    ok(pointMap.calls[0].match({
        clear: () => true,
// ReSharper disable UnusedParameter
        drawPoint: (row, column) => false
// ReSharper restore UnusedParameter
    }));
    const drawnPoints = new Array2D(height, width, false);
    for (let i = 1; i < 1 + 8; i++) {
        pointMap.calls[i].match({
            clear: () => ok(false),
            drawPoint: (row, column) => {
                if (drawnPoints.get(row, column)) {
                    ok(false); // no point is drawn twice
                } else {
                    ok(scene.get(row, column));
                    drawnPoints.set(row, column, true);
                }
            }
        });
    }
});

// We refrain from testing that exceptions in the PointMap methods are propagated,
// since it would take criminal energy to keep them from propagating

class TestPointMap implements PointMap {
    calls: PointMapCall[];

    constructor() {
        this.calls = new Array<PointMapCall>(); // <PointMapCall<number>[]>
    }

    clear() {
        this.calls.push(new Clear());
    }

    drawPoint(row: number, column: number) {
        this.calls.push(new DrawPoint(row, column));
    }

    node: any;
}

interface PointMapCall {
    match<TResult>(cases: PointMapCallCases<TResult>): TResult;
}

interface PointMapCallCases<TResult> {
    clear(): TResult;
    drawPoint(row: number, column: number): TResult;
}

class Clear<TResult, TPoint> implements PointMapCall {
    match<T>(cases: PointMapCallCases<T>) {
        return cases.clear();
    }
}

class DrawPoint<TResult> implements PointMapCall {
    constructor(private row: number, private column: number) {}

    match<T>(cases: PointMapCallCases<T>) {
        return cases.drawPoint(this.row, this.column);
    }
}