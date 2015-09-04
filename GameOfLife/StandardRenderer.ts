import Arrays = require("Imports/Core/Arrays");
import Interface = require("Interfaces");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import PointMap = Interface.PointMap;
import Renderer = Interface.Renderer;
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
import assertInt = TypeChecking.assertInt;

export function create(pointMap: PointMap, pointSize: number): Renderer {
    return new StandardRenderer(pointMap, pointSize);
}

class StandardRenderer<T> {

    constructor(private pointMap: PointMap, private pointSize: number) {
        assertDefinedAndNotNull("pointMap", pointMap);
        assertInt("pointSize", pointSize);
    }

    render(world: Array2D<T>) {
        assertDefinedAndNotNull("world", world);

        this.pointMap.clearRect(0, 0,
            world.width * this.pointSize, world.height * this.pointSize);

        for (let row = 0; row < world.height; row++) {
            for (let column = 0; column < world.width; column++) {
                if (world.get(row, column)) {
                    this.pointMap.drawPoint(column * this.pointSize, row * this.pointSize,
                        this.pointSize, this.pointSize);
                }
            }
        }
    }
}