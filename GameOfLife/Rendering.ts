/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Interface = require("./Interface");
import PointMap = Interface.PointMap;
import Exceptions = require("./Imports/Core/Exceptions");
import Int = require("./Imports/Core/Integers");
import xxx = Int.isNoInt;
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export class Renderer<T> {

    constructor(private pointMap: PointMap<T>) {
        if (pointMap == null || typeof pointMap === "undefined") {
            throw new ArgumentException("pointMap");
        }
        this.pointMap = pointMap;
    }

    render(scene: Array2D<T>) {
        if (scene == null || typeof scene === "undefined") {
            throw new ArgumentException("scene");
        }

        this.pointMap.clear();

        for (var row = 0; row < scene.height; row++) {
            for (var column = 0; column < scene.width; column++) {
                this.pointMap.drawPoint(row, column, scene.get(row, column));
            }
        }
    }
}
