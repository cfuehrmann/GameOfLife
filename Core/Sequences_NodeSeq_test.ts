import { createNodeSeq, Seq } from "Sequences";

let nodeArray: Node[];
let nodes: NodeList;
let seq: Seq<Node>;

QUnit.moduleStart(() => {
    nodeArray = new Array<Node>();
    // The only simple way to obtain a NodeList for testing seems 
    // to create HTML elements, attach them to the document,
    // and then obtain the nodes with some getElements function.
    // But the document persists across unit test files. 
    // So we must remove the nodes at the end of a test file.
    // Interestingly, the node list obtained with a getElements 
    // function is "live". That is, when nodes are removed from
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

QUnit.testStart(details => {
    seq = createNodeSeq(nodes);
});

let functionName: string;
let name = (testCaseName: string) => "NodeSeq, " + functionName + ": " + testCaseName;


// functionName = "constructor";

functionName = "filter";

QUnit.test(name("function works"), assert => {
    const result = seq.filter(n => new Array<string | null>("1", "3").indexOf(n.textContent) >= 0);

    assert.deepEqual(result.toArray(), [nodes[1], nodes[3]]);
});


functionName = "map";

QUnit.test(name("function works"), assert => {
    const result = seq.map(element => element.textContent + "x");

    assert.deepEqual(result.toArray(), ["0x", "1x", "2x", "3x"]);
});


functionName = "reduceRight";

QUnit.test(name("function works"), assert => {
    const result = seq.reduceRight((previous, current) => [previous, current], new Array<any>());

    assert.deepEqual(result, [[[[new Array<any>(), nodeArray[3]], nodeArray[2]], nodeArray[1]], nodeArray[0]]);
});


functionName = "n/a";

QUnit.test(name("reflects changes to Document"), assert => {
    const element = document.createElement("BUTTON");
    document.body.appendChild(element);
    const length = seq.toArray().length;
    document.body.removeChild(element);

    assert.strictEqual(seq.toArray().length, length - 1);
});