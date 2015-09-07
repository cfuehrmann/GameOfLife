﻿import Arrays = require("Imports/Core/Arrays");
import Interface = require("Interfaces");
import CanvasRenderer = require("CanvasRenderer");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import RectRenderingContext = Interface.RectRenderingContext;
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;

let method: string;
let name = (testCase: string) => "CanvasRenderer, " + method + ": " + testCase;

method = "create";

test(name("context when undefined or null"),
    checkDefinedAndNotNullAssert("context",
    (context: RectRenderingContext) => CanvasRenderer.create(context, 1))
);

test(name("pointSize when undefined or null"),
    checkDefinedAndNotNullAssert("pointSize",
    (context: number) => CanvasRenderer.create(new TestContext(), context))
);


method = "render";

test(name("world when undefined or null"), () => {
    const r = CanvasRenderer.create(new TestContext(), 1);

    checkDefinedAndNotNullAssert("world", (world: Array2D<boolean>) => r.render(world))();
});


test(name("ContextCallSequence"), () => {
    // PREPARE

    const context = new TestContext();
    const renderer = CanvasRenderer.create(context, 1);
    const width = 5;
    const height = 3;
    const world = new Array2D(height, width, false);

    world.set(0, 0, true);
    world.set(0, 1, false);
    world.set(0, 2, true);
    world.set(0, 3, false);
    world.set(0, 4, true);

    world.set(1, 0, false);
    world.set(1, 1, true);
    world.set(1, 2, false);
    world.set(1, 3, true);
    world.set(1, 4, false);

    world.set(2, 0, true);
    world.set(2, 1, false);
    world.set(2, 2, true);
    world.set(2, 3, false);
    world.set(2, 4, true);

    // ACT
    renderer.render(world);

    // ASSERT 
    strictEqual(context.calls.length, 1 + 8);
    ok(context.calls[0].match({
        clearRect: (x, y, w, h) => true,
// ReSharper disable UnusedParameter
        fillRect: (row, column) => false
// ReSharper restore UnusedParameter
    }));
    const drawnPoints = new Array2D(height, width, false);
    for (let i = 1; i < 1 + 8; i++) {
        context.calls[i].match({
            clearRect: (x, y, w, h) => ok(false),
            fillRect: (x, y) => {
                if (drawnPoints.get(y, x)) {
                    ok(false); // no point is drawn twice
                } else {
                    ok(world.get(y, x));
                    drawnPoints.set(y, x, true);
                }
            }
        });
    }
});

// We refrain from testing that exceptions in the PointMap methods are propagated,
// since it would take criminal energy to keep them from propagating

class TestContext implements RectRenderingContext {
    calls: ContextCall[];

    constructor() {
        this.calls = new Array<ContextCall>();
    }

    clearRect(x: number, y: number, w: number, h: number) {
        this.calls.push(new Clear(x, y, w, h));
    }

    fillRect(x: number, y: number, w: number, h: number) {
        this.calls.push(new FillRect(x, y, w, h));
    }

    node: any;
}

interface ContextCall {
    match<TResult>(cases: ContextCallCases<TResult>): TResult;
}

interface ContextCallCases<TResult> {
    clearRect(x: number, y: number, w: number, h: number): TResult;
    fillRect(x: number, y: number, w: number, h: number): TResult;
}

class Clear<TResult, TPoint> implements ContextCall {
    constructor(private x: number, private y: number, private w: number, private h: number) {}

    match<T>(cases: ContextCallCases<T>) {
        return cases.clearRect(this.x, this.y, this.w, this.h);
    }
}

class FillRect<TResult> implements ContextCall {
    constructor(private x: number, private y: number, private w: number, private h: number) {}

    match<T>(cases: ContextCallCases<T>) {
        return cases.fillRect(this.x, this.y, this.w, this.h);
    }
}