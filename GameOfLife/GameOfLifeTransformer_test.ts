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

const world0 = new Array2D(3, 3, false);

const world1 = new Array2D(3, 3, false);
world1.set(0, 0, true);

const world2 = new Array2D(3, 3, false);
world2.set(0, 0, true);
world2.set(0, 1, true);

const world3 = new Array2D(3, 3, false);
world3.set(0, 0, true);
world3.set(0, 1, true);
world3.set(0, 2, true);

const world4 = new Array2D(3, 3, false);
world4.set(0, 0, true);
world4.set(0, 1, true);
world4.set(0, 2, true);
world4.set(1, 0, true);

const world5 = new Array2D(3, 3, false);
world5.set(0, 0, true);
world5.set(0, 1, true);
world5.set(0, 2, true);
world5.set(1, 0, true);
world5.set(1, 2, true);

const world6 = new Array2D(3, 3, false);
world6.set(0, 0, true);
world6.set(0, 1, true);
world6.set(0, 2, true);
world6.set(1, 0, true);
world6.set(1, 2, true);
world6.set(2, 0, true);

const world7 = new Array2D(3, 3, false);
world7.set(0, 0, true);
world7.set(0, 1, true);
world7.set(0, 2, true);
world7.set(1, 0, true);
world7.set(1, 2, true);
world7.set(2, 0, true);
world7.set(2, 1, true);

const world8 = new Array2D(3, 3, false);
world8.set(0, 0, true);
world8.set(0, 1, true);
world8.set(0, 2, true);
world8.set(1, 0, true);
world8.set(1, 2, true);
world8.set(2, 0, true);
world8.set(2, 1, true);
world8.set(2, 2, true);

const worlds = [world0, world1, world2, world3, world4, world5, world6, world7, world8];


test(name("SingleBirthNumber"), () => {
    // PREPARE

    const nextWorld = new Array2D(3, 3, false);

    // ACT

    for (let birthNumber = 0; birthNumber < 9; birthNumber++) {
        const t = GameOfLifeTransformer.create(new Array<number>(), [birthNumber]);

        for (let i = 0; i < 9; i++) {
            t.transform(worlds[i], nextWorld);

            // ASSERT

            strictEqual(nextWorld.get(1, 1), i === birthNumber);
        }
    }
});

// todo: add more tests?