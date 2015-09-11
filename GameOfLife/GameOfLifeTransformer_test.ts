import GameOfLifeTransformer = require("GameOfLifeTransformer");
import TypeChecking = require("Imports/Core/TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
import Arrays = require("Imports/Core/Arrays");
import Array2D = Arrays.Array2D;

let method: string;
let name = (testCase: string) => "GameOfLifeTransformer, " + method + ": " + testCase;


method = "create";

test(name("survivalCondition when undefined or null"),
    checkDefinedAndNotNullAssert("survivalCondition",
    (survivalCondition: number[]) => GameOfLifeTransformer.create(survivalCondition, [0]))
);

test(name("birthCondition when undefined or null"),
    checkDefinedAndNotNullAssert("birthCondition",
    (birthCondition: number[]) => GameOfLifeTransformer.create([0], birthCondition))
);

//function subArrays<T>(a: T[]): T[][] {
//    if (a.length === 0) {
//        return [[]];
//    }

//    return subArrays(a.slice(1)).
//        reduce((previous: T[][], current: T[]) => previous.concat([current, [a[0]].concat(current)]), []);
//}


function getWorld(n: number) {
    const result = new Array2D(3, 3, false);

    let numberOfPointsSet = 0;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {

            if (numberOfPointsSet >= n) {
                return result;
            }

            if (row !== 1 || col !== 1) {
                result.set(row, col, true);
                numberOfPointsSet++;
            }
        }
    }

    return result;
}

//test(name("subArrays"), () => {
//    deepEqual(subArrays([1, 2]), [[], [1], [2], [1, 2]]);
//});

test(name("SingleSurvivalNumber"), () => {
    const nextWorld = new Array2D(3, 3, false);

    for (let n = 0; n < 9; n++) {
        const t = GameOfLifeTransformer.create([n], []);

        for (let neighbors = 0; neighbors < 9; neighbors++) {
            const w = getWorld(neighbors);
            w.set(1, 1, true);
            t.transform(w, nextWorld);

            strictEqual(nextWorld.get(1, 1), neighbors === n);
        }
    }
});

test(name("First of two survival numbers"), () => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(2);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});

test(name("Second of two survival numbers"), () => {
    const t = GameOfLifeTransformer.create([3, 2], []);
    const nextWorld = new Array2D(3, 3, false);
    const w = getWorld(3);
    w.set(1, 1, true);

    t.transform(w, nextWorld);

    strictEqual(nextWorld.get(1, 1), true);
});

//test(name("Birth wins when empty"), () => {
//    const t = GameOfLifeTransformer.create([7], [7]);
//    const w = getWorld(5);

//});

// todo: add more tests?