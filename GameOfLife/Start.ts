/* tslint:disable no-unused-variable*/
import Sequences = require("./Imports/Core/Sequences");
/* tslint:enable no-unused-variable*/

module Start {
    "use strict";
    export function exec() {
        document.getElementById("createWorld").onclick = createWorld;
    }

    function createWorld() {
        document.location.href = "world.html?survival=" + getChecked("survivalCondition") +
        "&birth=" + getChecked("birthCondition");
    }

    function getChecked(elementName: string) {
        var nodeList = document.getElementsByName(elementName);
        return new Sequences.NodeSeq(nodeList)
            .filter(n => (<any>n).checked)
            .map(n => <string>(<any>n).value)
            .reduceRight((previous: string, current: string) => current + "," + previous, "");
    }
}

Start.exec();