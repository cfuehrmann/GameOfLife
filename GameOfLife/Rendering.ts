/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
/* tslint:enable no-unused-variable*/

export class Renderer {
    render(ctx: CanvasRenderingContext2D, scene: Array2D) {
        ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";

        scene.each((x: Int, y: Int) => {
            if (scene.get(x, y)) {
                ctx.fillRect(x.getValue() * 10, y.getValue() * 10, 10, 10);
            }
        });
    }
}

