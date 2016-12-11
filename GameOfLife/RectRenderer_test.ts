import { Array2D } from "Imports/Core/Arrays";
import { RectRenderingContext } from "Interfaces";
import * as RectRenderer from "RectRenderer";
import { assertDefinedAndNotNull, assertInt } from "Imports/Core/TypeAssertions";
import { checkInt } from "Imports/Core/TypeChecks";

let functionName: string;
let name = (testCase: string) => "RectRenderer, " + functionName + ": " + testCase;

functionName = "create";

QUnit.test(name("context when undefined or null"), assert =>
    assertDefinedAndNotNull("context",
        (context: RectRenderingContext) => RectRenderer.create(context, 1))
);

QUnit.test(name("pointSize when undefined or null"), assert =>
    assertDefinedAndNotNull("pointSize",
        (pointSize: number) => RectRenderer.create(new TestContext(), pointSize))
);

QUnit.test(name("pointSize when not integer"), assert =>
    assertInt("pointSize",
        (pointSize: number) => RectRenderer.create(new TestContext(), pointSize))
);

functionName = "render";

QUnit.test(name("world when undefined or null"), assert => {
    const r = RectRenderer.create(new TestContext(), 1);

    assertDefinedAndNotNull("world", (world: Array2D<boolean>) => r.render(world));
});


QUnit.test(name("ContextCallSequence"), assert => {
    // PREPARE

    const context = new TestContext();
    const pointSize = 4;
    const renderer = RectRenderer.create(context, pointSize);
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

    // The first call must be clearRect with the proper parameters:
    assert.ok(context.calls[0].match({
        clearRect: (x, y, w, h) => x === 0 && y === 0 &&
            w === width * pointSize && h === height * pointSize,
        fillRect: () => false
    }));

    // The subsequent calls must be fillRects with proper parameters.
    // In particular, each fillRect call must correspond to coordinates
    // where "world" is true, and no such coordinates must occur twice:
    for (let i = 1; i < context.calls.length; i++) {
        context.calls[i].match({
            clearRect: () => assert.ok(false),
            fillRect: (x, y, w, h) => {
                checkInt("x", x);
                checkInt("y", y);
                assert.ok(x >= 0);
                assert.ok(y >= 0);
                assert.strictEqual(w, pointSize);
                assert.strictEqual(h, pointSize);
                const row = Math.floor(y / pointSize);
                const column = Math.floor(x / pointSize);
                assert.ok(world.get(row, column));
                world.set(row, column, false);
            }
        });
    }

    // The calls to fillRect must exhaust all coordinates where world is true:
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            assert.strictEqual(world.get(row, column), false);
        }
    }
});

// We refrain from testing that exceptions in the RectRenderingContext functions 
// are propagated, since it would take criminal energy to keep them from propagating

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
}

interface ContextCall {
    match<TResult>(cases: ContextCallCases<TResult>): TResult;
}

interface ContextCallCases<TResult> {
    clearRect(x: number, y: number, w: number, h: number): TResult;
    fillRect(x: number, y: number, w: number, h: number): TResult;
}

class Clear<TResult, TPoint> implements ContextCall {
    constructor(private x: number, private y: number, private w: number, private h: number) { }

    match<T>(cases: ContextCallCases<T>) {
        return cases.clearRect(this.x, this.y, this.w, this.h);
    }
}

class FillRect<TResult> implements ContextCall {
    constructor(private x: number, private y: number, private w: number, private h: number) { }

    match<T>(cases: ContextCallCases<T>) {
        return cases.fillRect(this.x, this.y, this.w, this.h);
    }
}