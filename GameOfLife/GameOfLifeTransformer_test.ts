import GameOfLifeTransformer = require("GameOfLifeTransformer");
import TypeChecking = require("Imports/Core/TypeChecking");
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;

let method: string;
let name = (testCase: string) => "GameOfLifeTransformer, " + method + ": " + testCase;


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


method = "create";

test(name("survivalCondition when undefined or null"),
    assertDefinedAndNotNull("survivalCondition",
    (survivalCondition: number[]) => GameOfLifeTransformer.create(survivalCondition, [0]))
);

test(name("birthCondition when undefined or null"),
    assertDefinedAndNotNull("birthCondition",
    (birthCondition: number[]) => GameOfLifeTransformer.create([0], birthCondition))
);


method = "transform";

test(name("Single survival number when alive"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([n], []);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);
            w.set(1, 1, true);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 1), neighbors === n);
        }
    }
});

test(name("Single survival number when dead"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([n], []);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 1), false);
        }
    }
});

test(name("First of two survival numbers"), () => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(2, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});

test(name("Second of two survival numbers"), () => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});


test(name("Single birth number when dead"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 1), neighbors === n);
        }
    }
});

test(name("Single birth number when alive"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 1);
            w.set(1, 1, true);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 1), false);
        }
    }
});

test(name("First of two birth numbers"), () => {
    const t = GameOfLifeTransformer.create([], [3, 2]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(2, 1, 1);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});

test(name("Second of two birth numbers"), () => {
    const t = GameOfLifeTransformer.create([], [3, 2]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});


test(name("Overlapping birth"), () => {
    const t = GameOfLifeTransformer.create([], [0]);
    const w = new Array2D(3, 4, false);
    const nextWorld = new Array2D(3, 4, false);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 2), true);
    strictEqual(nextWorld.get(1, 3), true);
});

test(name("Overlapping death"), () => {
    const t = GameOfLifeTransformer.create([1], []);
    const w = new Array2D(3, 4, false);
    const nextWorld = new Array2D(3, 4, false);
    w.set(1, 2, true);
    w.set(1, 3, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(0, 0), false);
    strictEqual(nextWorld.get(0, 1), false);
});


test(name("Birth wins when dead"), () => {
    const t = GameOfLifeTransformer.create([3], [3]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});

test(name("Survival wins when alive"), () => {
    const t = GameOfLifeTransformer.create([3], [3]);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3, 1, 1);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});


test(name("Proper counting top left"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 0);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(0, 0), neighbors === n);
        }
    }
});

test(name("Proper counting top"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 1);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(0, 1), neighbors === n);
        }
    }
});

test(name("Proper counting top right"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 0, 2);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(0, 2), neighbors === n);
        }
    }
});

test(name("Proper counting left"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 0);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 0), neighbors === n);
        }
    }
});

test(name("Proper counting right"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 1, 2);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 2), neighbors === n);
        }
    }
});

test(name("Proper counting bottom left"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 0);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(2, 0), neighbors === n);
        }
    }
});

test(name("Proper counting bottom"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 1);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(2, 1), neighbors === n);
        }
    }
});

test(name("Proper counting bottom right"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([], [n]);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors, 2, 2);

            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(2, 2), neighbors === n);
        }
    }
});