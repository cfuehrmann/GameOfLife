/* tslint:disable no-unused-variable*/
import Arrays = require("./Imports/Core/Arrays");
import Array2D = Arrays.Array2D;
import Numbers = require("./Imports/Core/Numbers");
import Interface = require("./Interfaces");
import StandardRenderer = require("./StandardRenderer");
import CanvasPointMap = require("./CanvasPointMap");
import StandardTransformer = require("./StandardTransformer");
/* tslint:enable no-unused-variable*/

module Main {
    "use strict";
    export function exec() {
        document.getElementById("berechnen").onclick = berechne_BMI;
    }

    function berechne_BMI() {
        var sc = document.getElementsByName("survivalCondition");
        document.location.href =
        "world.html?" + "survival=" + radioWert(sc)
        + "&xx=42";
    }

    function radioWert(rObj: NodeList): string {
        var result = "";
        for (var i = 0; i < rObj.length; i++) {
            var x = <HTMLInputElement> rObj[i];
            if (x.checked) {
                result += x.value;
                if (i < rObj.length - 1) {
                    result += ",";
                }
            }
        }

        return result;
    }
}

Main.exec();