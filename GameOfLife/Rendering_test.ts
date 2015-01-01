/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import Rendering = require("Rendering");
import Renderer = Rendering.Renderer;
import Interface = require("Interface");
import PointMap = Interface.PointMap;
import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "Renderer";

method = "constructor";

check("pointMapNull", () => {
    throws(() => new Renderer(null),
        (e: ArgumentException) => e.getArgumentName() === "pointMap");
});

check("pointMapUndefined", () => {
    throws(() => new Renderer(undefined),
        (e: ArgumentException) => e.getArgumentName() === "pointMap");
});

method = "render";

check("sceneNull", () => {
    var r = new Renderer(new TestPointMap());

    throws(() => r.render(null),
        (e: ArgumentException) => e.getArgumentName() === "scene");
});

check("sceneUndefined", () => {
    var r = new Renderer(new TestPointMap());

    throws(() => r.render(undefined),
        (e: ArgumentException) => e.getArgumentName() === "scene");
});

check("PointMapCallSequence", () => {
    var pointMap = new TestPointMap();
    var renderer = new Renderer(pointMap);
    var width = 5;
    var height = 7;
    var scene = new Array2D(height, width, 0);
    for (var row = 0; row < height; row++) {
        for (var column = 0; column < width; column++) {
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
    for (var i = 1; i < 1 + width * height; i++) {
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

class TestPointMap implements PointMap<number>{
    public calls: PointMapCall<number>[];

    constructor() {
        this.calls = [];
    }

    clear() {
        this.calls.push(new Clear());
    }

    drawPoint(row: number, column: number, value: number) {
        this.calls.push(new DrawPoint(row, column, value));
    }
}

interface PointMapCall<TPoint> {
    match<TResult>(cases: PointMapCallCases<TResult, TPoint>): TResult;
}

interface PointMapCallCases<TResult, TPoint> {
    clear(): TResult;
    drawPoint(row: number, column: number, value: TPoint): TResult;
}

class Clear<TResult, TPoint> implements PointMapCall<TPoint>  {
    match<T>(cases: PointMapCallCases<T, TPoint>) {
        return cases.clear();
    }
}

class DrawPoint<TResult, TPoint> implements PointMapCall<TPoint> {
    constructor(private row: number, private column: number, private value: TPoint) { }

    match<T>(cases: PointMapCallCases<T, TPoint>) {
        return cases.drawPoint(this.row, this.column, this.value);
    }
}