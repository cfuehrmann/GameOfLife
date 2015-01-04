/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Numbers = require("./Imports/Core/Numbers");
/* tslint:enable no-unused-variable*/

export interface Transformer {
    transform(currentWorld: Array2D<boolean>, nextWorld: Array2D<boolean>): void
}

export function getTransformer(survivalCondition: number[], birthCondition: number[]): Transformer {
    return new PrivateTransformer(survivalCondition, birthCondition);
}

class PrivateTransformer implements Transformer {
    constructor(private survivalCondition: number[], private birthCondition: number[]) {
    }

    public transform(currentWorld: Array2D<boolean>, nextWorld: Array2D<boolean>) {
        var w = currentWorld.width;
        var h = currentWorld.height;

        for (var column = 0; column < w; column++) {
            for (var row = 0; row < h; row++) {
                nextWorld.set(row, column, this.nextValue(currentWorld, row, column));
            }
        }
    }

    nextValue(world: Array2D<boolean>, row: number, column: number) {
        var up = Numbers.mod(row - 1, world.height);
        var right = Numbers.mod(column + 1, world.width);
        var down = Numbers.mod(row + 1, world.height);
        var left = Numbers.mod(column - 1, world.width);

        var count =
            // the following is too slow to be run inside this loop:
            //List.from([[up, column], [up, right], [row, right], [down, right],
            //    [down, column], [down, left], [row, left], [up, left]])
            //    .map(pair => world.get(pair[0], pair[1]) ? 1 : 0)
            //    .fold(0, (x: number, y: number) => x + y);
            // this is too slow also:
            //[[up, column], [up, right], [row, right], [down, right],
            //    [down, column], [down, left], [row, left], [up, left]]
            //    .map(pair => world.get(pair[0], pair[1]) ? 1 : 0)
            //    .reduce((x: number, y: number) => x + y, 0);
            (world.get(up, column) ? 1 : 0) +
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

