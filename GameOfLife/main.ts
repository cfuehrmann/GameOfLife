import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;

class Renderer {
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

module Bla {
    "use strict";
    export function exec() {
        var canv = document.createElement("canvas");
        canv.width = 100 * 10;
        canv.height = 100 * 10;
        document.body.appendChild(canv);
        var ctx = canv.getContext("2d");
        var renderer = new Renderer();
        var scene = new Array2D(new Int(100), new Int(100));
        scene.set(new Int(10), new Int(10), true);
        return renderer.render(ctx, scene);
    }
}

// window.onload = function () {
//    Bla.exec();
// };

Bla.exec();