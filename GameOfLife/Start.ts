/* tslint:disable no-unused-variable*/
import Sequences = require("./Imports/Core/Sequences");
/* tslint:enable no-unused-variable*/

module Start {
    "use strict";

    function getChecked(elementName: string) {
        const nodeList = document.getElementsByName(elementName);
        return new Sequences.NodeSeq(nodeList)
            .filter(n => (<any>n).checked)
            .map(n => <string>(<any>n).value)
            .reduceRight((previous: string, current: string) => current + "," + previous, "");
    }

    function createWorld() {
        document.location.href = "world.html?survival=" + getChecked("survivalCondition") +
            "&birth=" + getChecked("birthCondition");
    }

    export function exec() {
        document.getElementById("createWorld").onclick = createWorld;
    }
}

Start.exec();