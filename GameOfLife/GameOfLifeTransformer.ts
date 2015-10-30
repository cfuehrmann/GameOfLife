import Arrays = require("./Imports/Core/Arrays");
import Numbers = require("./Imports/Core/Numbers");
import Interface = require("./Interfaces");
import TypeChecking = require("./Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import Transformer = Interface.Transformer;
import checkDefinedAndNotNull = TypeChecking.checkDefinedAndNotNull;

export function create(survivalCondition: number[], birthCondition: number[]): Transformer<boolean> {
    checkDefinedAndNotNull("survivalCondition", survivalCondition);
    checkDefinedAndNotNull("birthCondition", birthCondition);
    return new GameOfLifeTransformer(survivalCondition, birthCondition);
}

class GameOfLifeTransformer implements Transformer<boolean> {
    constructor(private survivalCondition: number[], private birthCondition: number[]) {
    }

    public transform(currentWorld: Array2D<boolean>, nextWorld: Array2D<boolean>) {
        const w = currentWorld.width;
        const h = currentWorld.height;
        for (let column = 0; column < w; column++) {
            for (let row = 0; row < h; row++) {
                nextWorld.set(row, column, this.nextValue(currentWorld, row, column));
            }
        }
    }

    nextValue(world: Array2D<boolean>, row: number, column: number) {
        const up = Numbers.mod(row - 1, world.height);
        const right = Numbers.mod(column + 1, world.width);
        const down = Numbers.mod(row + 1, world.height);
        const left = Numbers.mod(column - 1, world.width);
        const count = (world.get(up, column) ? 1 : 0) +
        (world.get(up, right) ? 1 : 0) +
        (world.get(row, right) ? 1 : 0) +
        (world.get(down, right) ? 1 : 0) +
        (world.get(down, column) ? 1 : 0) +
        (world.get(down, left) ? 1 : 0) +
        (world.get(row, left) ? 1 : 0) +
        (world.get(up, left) ? 1 : 0);
        return world.get(row, column) ?
            this.survivalCondition.indexOf(count) >= 0 :
            this.birthCondition.indexOf(count) >= 0;
    }
}
