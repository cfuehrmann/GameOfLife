import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;

export class Renderer {
    render(ctx: CanvasRenderingContext2D, scene: Array2D) {
        ctx.fillStyle = "rgb(" + String(255) + ", " + String(0) + ", " + String(0) + ")";
        for (var y = 0; y < scene.getHeight().getValue(); y++) {
            for (var x = 0; x < scene.getWidth().getValue(); x++) {
                if (scene.get(new Int(x), new Int(y))) {
                    ctx.fillRect(x * 10, y * 10, 10, 10);
                }
            }
        }
    }
}

 