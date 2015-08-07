import Arrays = require("./Imports/Core/Arrays");
import Interface = require("./Interfaces");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import PointMap = Interface.PointMap;
import Renderer = Interface.Renderer;
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;

export function create<T>(pointMap: PointMap<T>): Renderer<T> {
    return new StandardRenderer(pointMap);
}

class StandardRenderer<T> {

    constructor(private pointMap: PointMap<T>) {
        assertDefinedAndNotNull("pointMap", pointMap);
    }

    render(world: Array2D<T>) {
        assertDefinedAndNotNull("world", world);

        this.pointMap.clear();

        for (let row = 0; row < world.height; row++) {
            for (let column = 0; column < world.width; column++) {
                this.pointMap.drawPoint(row, column, world.get(row, column));
            }
        }
    }
}
