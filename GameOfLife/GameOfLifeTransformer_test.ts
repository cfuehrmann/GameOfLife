import * as GameOfLifeTransformer from "GameOfLifeTransformer";
import { assertDefinedAndNotNull } from "Imports/Core/TypeAssertions";
import { Array2D } from "Imports/Core/Arrays";

let functionName: string;
let name = (testCase: string) => `GameOfLifeTransformer, ${functionName}: ${testCase}`;


function getWorld(n: number, sparedRow: number, sparedCol: number) {
    const result = new Array2D(3, 3, false);

    let numberOfPointsSet = 0;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {

            if (numberOfPointsSet >= n) {
                return result;
            }

            if (row !== sparedRow || col !== sparedCol) {
                result.set(row, col, true);
                numberOfPointsSet++;
            }
        }
    }

    return result;
}


functionName = "create";

QUnit.test(name("survivalCondition when undefined or null"), assert =>
    assertDefinedAndNotNull("survivalCondition",
        (survivalCondition: number[]) => GameOfLifeTransformer.create(survivalCondition, [0]))
);

QUnit.test(name("birthCondition when undefined or null"), assert =>
    assertDefinedAndNotNull("birthCondition",
        (birthCondition: number[]) => GameOfLifeTransformer.create([0], birthCondition))
);


functionName = "transform";

QUnit.test(name("Single survival number when alive"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([n], []);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);
            w.set(1, 1, true);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 1), neighbors === n);
        }
    }
});

QUnit.test(name("Single survival number when dead"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([n], []);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 1), false);
        }
    }
});

QUnit.test(name("First of two survival numbers"), assert => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(2, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});

QUnit.test(name("Second of two survival numbers"), assert => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});


QUnit.test(name("Single birth number when dead"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 1), neighbors === n);
        }
    }
});

QUnit.test(name("Single birth number when alive"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);
            w.set(1, 1, true);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 1), false);
        }
    }
});

QUnit.test(name("First of two birth numbers"), assert => {
    const t = GameOfLifeTransformer.create([], [3, 2]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(2, 1, 1);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});

QUnit.test(name("Second of two birth numbers"), assert => {
    const t = GameOfLifeTransformer.create([], [3, 2]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});


QUnit.test(name("Overlapping birth"), assert => {
    const t = GameOfLifeTransformer.create([], [0]);
    const w = new Array2D(3, 4, false);
    const nextWorld = new Array2D(3, 4, false);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 2), true);
    assert.strictEqual(nextWorld.get(1, 3), true);
});

QUnit.test(name("Overlapping death"), assert => {
    const t = GameOfLifeTransformer.create([1], []);
    const w = new Array2D(3, 4, false);
    const nextWorld = new Array2D(3, 4, false);
    w.set(1, 2, true);
    w.set(1, 3, true);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(0, 0), false);
    assert.strictEqual(nextWorld.get(0, 1), false);
});


QUnit.test(name("Birth wins when dead"), assert => {
    const t = GameOfLifeTransformer.create([3], [3]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});

QUnit.test(name("Survival wins when alive"), assert => {
    const t = GameOfLifeTransformer.create([3], [3]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    assert.strictEqual(nextWorld.get(1, 1), true);
});


QUnit.test(name("Proper counting top left"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 0);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(0, 0), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting top"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 1);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(0, 1), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting top right"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 2);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(0, 2), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting left"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 0);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 0), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting right"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 2);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(1, 2), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting bottom left"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 0);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(2, 0), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting bottom"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 1);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(2, 1), neighbors === n);
        }
    }
});

QUnit.test(name("Proper counting bottom right"), assert => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 2);

            t.transform(w, nextWorld);

            assert.strictEqual(nextWorld.get(2, 2), neighbors === n);
        }
    }
});