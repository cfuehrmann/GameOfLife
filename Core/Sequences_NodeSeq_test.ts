/* tslint:disable no-unused-variable*/
import Sequences = require("Sequences");
import TypeChecking = require("TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
import NodeSeq = Sequences.NodeSeq;
/* tslint:enable no-unused-variable*/

let nodeArray: Node[];
let nodes: NodeList;
var seq: NodeSeq; // "var" because otherwise R# makes a type inference error

QUnit.moduleStart(() => {
    nodeArray = new Array<Node>();
    // The only simple way to obtain a NodeList for testing seems 
    // to create HTML elements, attach them to the document,
    // and then obtain the nodes with some getElements method.
    // But the document persists across unit test files. 
    // So we must remove the nodes at the end of a test file.
    // Interestingly, the node list obtained with a getElements m
    // method is "live". That is, when nodes are removed from
    // the document, the originally-obtained node list shrinks.
    // This complicates the final removal of the nodes, and
    // we address that problem with the extra node array. 
    for (let i = 0; i <= 3; i++) {
        const element = document.createElement("BUTTON");
        document.body.appendChild(element);
        element.textContent = i.toString();
        nodeArray.push(element);
    }
    nodes = document.getElementsByTagName("button");
});

QUnit.moduleDone(() => {
    for (let s of nodeArray) {
        document.body.removeChild(s);
    }
});

QUnit.testStart(() => {
    seq = new NodeSeq(nodes);
});

let method: string;
let name = (testCaseName: string) => "NodeSeq, " + method + ": " + testCaseName;


method = "constructor";

test(name("Argument is defined"),
    checkDefinedAndNotNullAssert("seq", (n: NodeList) => new Sequences.NodeSeq(n))
);


method = "filter";

test(name("Argument is defined"), () => {
    checkDefinedAndNotNullAssert("condition", seq.filter)();
});

test(name("method works"), () => {
    const result = seq.filter(n => ["1", "3"].indexOf(n.textContent) >= 0);

    deepEqual(result.toArray(), [nodes[1], nodes[3]]);
});


method = "map";

test(name("Argument is defined"), () => {
    checkDefinedAndNotNullAssert("transform", seq.map)();
});

test(name("method works"), () => {
    const result = seq.map(element => element.textContent + "x");

    deepEqual(result.toArray(), ["0x", "1x", "2x", "3x"]);
});


method = "reduceRight";

test(name("Argument is defined"), () => {
    const testee = (f: (previous: number, current: Node) => number) => seq.reduceRight(f, 42);

    checkDefinedAndNotNullAssert("f", testee)();
});

test(name("method works"), () => {
    const result = seq.reduceRight((previous, current) => [previous, current], new Array<any>());

    deepEqual(result, [[[[new Array<any>(), nodeArray[3]], nodeArray[2]], nodeArray[1]], nodeArray[0]]);
});


method = "n/a";

test(name("reflects changes to Document"), () => {
    const element = document.createElement("BUTTON");
    document.body.appendChild(element);
    const length = seq.toArray().length;
    document.body.removeChild(element);

    strictEqual(seq.toArray().length, length - 1);
});