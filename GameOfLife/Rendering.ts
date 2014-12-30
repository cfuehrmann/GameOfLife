/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
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
        this.pointMap = pointMap;
    }

    render(scene: Array2D<T>) {
        if (scene == null || typeof scene === "undefined") {
            throw new ArgumentException("scene");
        }

        this.pointMap.clear();

        scene.getHeight().each(row => {
            scene.getWidth().each(column => {
                this.pointMap.drawPoint(row, column, scene.get(row, column));
            });
        });
    }
}
