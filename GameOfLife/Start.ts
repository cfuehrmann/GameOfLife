/* At runtime, karma provides the qunit implementation from node_modules.
 * The reference here is only to satisfy the typescript compiler. Interestingly,
 * having the reference in one place eliminates the need to add it anywhere else.
 * Since there is no canonical unit test file, we put the reference here.
 */
/// <reference path="Imports/QUnit/qunit.d.ts" />

import * as Sequences from "Imports/Core/Sequences";

function getChecked(elementName: string) {
    const nodeList = document.getElementsByName(elementName);
    return Sequences.createNodeSeq(nodeList)
        .filter(n => (<any>n).checked)
        .map(n => <string>(<any>n).value)
        .reduceRight((previous: string, current: string) => current + "," + previous, "");
}

function createWorld() {
    document.location.href = "world.html?survival=" + getChecked("survivalCondition") +
        "&birth=" + getChecked("birthCondition");
}

document.getElementById("createWorld").onclick = createWorld;