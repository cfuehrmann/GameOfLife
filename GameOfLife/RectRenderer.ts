import {Array2D} from "Imports/Core/Arrays";
import {RectRenderingContext, Renderer} from "Interfaces";
import {checkDefinedAndNotNull, checkInt} from "Imports/Core/TypeChecks";

export function create(context: RectRenderingContext, pointSize: number): Renderer {
    return new RectRenderer(context, pointSize);
}

class RectRenderer<T> {

    constructor(private context: RectRenderingContext, private pointSize: number) {
        checkDefinedAndNotNull("context", context);
        checkInt("pointSize", pointSize);
    }

    render(world: Array2D<T>) {
        checkDefinedAndNotNull("world", world);

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