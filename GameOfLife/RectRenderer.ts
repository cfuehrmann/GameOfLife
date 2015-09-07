import Arrays = require("Imports/Core/Arrays");
import Interface = require("Interfaces");
import TypeChecking = require("Imports/Core/TypeChecking");
import Array2D = Arrays.Array2D;
import RectRenderingContext = Interface.RectRenderingContext;
import Renderer = Interface.Renderer;
import assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
import assertInt = TypeChecking.assertInt;

export function create(context: RectRenderingContext, pointSize: number): Renderer {
    return new RectRenderer(context, pointSize);
}

class RectRenderer<T> {

    constructor(private context: RectRenderingContext, private pointSize: number) {
        assertDefinedAndNotNull("context", context);
        assertInt("pointSize", pointSize);
    }

    render(world: Array2D<T>) {
        assertDefinedAndNotNull("world", world);

        this.context.clearRect(0, 0,
            world.width * this.pointSize, world.height * this.pointSize);

        for (let row = 0; row < world.height; row++) {
            for (let column = 0; column < world.width; column++) {
                if (world.get(row, column)) {
                    this.context.fillRect(column * this.pointSize, row * this.pointSize,
                        this.pointSize, this.pointSize);
                }
            }
        }
    }
}