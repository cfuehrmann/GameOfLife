/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
import Rendering = require("./Rendering");
import Renderer = Rendering.Renderer;
/* tslint:enable no-unused-variable*/

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