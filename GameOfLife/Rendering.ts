/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
import Exceptions = require("./Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/
export class Renderer<T> {

    constructor(private pointMap: PointMap<T>) {
        if (pointMap == null || typeof pointMap === "undefined") {
            throw new ArgumentException("pointMap");
        }
    }

    render(world: Array2D<T>) {
        if (world == null || typeof world === "undefined") {
            throw new ArgumentException("scene");
        }

        this.pointMap.clear();

        for (var row = 0; row < world.height; row++) {
            for (var column = 0; column < world.width; column++) {
                this.pointMap.drawPoint(row, column, world.get(row, column));
            }
        }
    }
}
