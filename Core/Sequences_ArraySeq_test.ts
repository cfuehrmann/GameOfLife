import Sequences = require("Sequences");
import TypeAssertions = require("TypeAssertions");
import assertDefinedAndNotNull = TypeAssertions.assertDefinedAndNotNull;
import createArraySeq = Sequences.createArraySeq;

var seq: Sequences.Seq<number>; // "var" because otherwise R# makes a type inference error

let functionName: string;
let name = (testCaseName: string) => "ArraySeq, " + functionName + ": " + testCaseName;

QUnit.testStart(() => {
    seq = createArraySeq([0, 1, 2, 3]);
});


functionName = "constructor";

test(name("Argument is defined"),
    assertDefinedAndNotNull("seq", (seq: number[]) => createArraySeq(seq))
);


functionName = "filter";

test(name("Argument is defined"), () => {
    assertDefinedAndNotNull("condition", seq.filter)();
});

test(name("function works"), () => {
    const result = seq.filter(n => [1, 3].indexOf(n) >= 0).toArray();

    deepEqual(result, [1, 3]);
});


functionName = "map";

test(name("Argument is defined"), () => {
    assertDefinedAndNotNull("transform", seq.map)();
});

test(name("function works"), () => {
    const result = seq.map(element => 2 * element);

    deepEqual(result.toArray(), [0, 2, 4, 6]);
});


functionName = "reduceRight";

test(name("Argument is defined"), () => {
    const testee = (f: (previous: number, current: number) => number) => seq.reduceRight(f, 42);

    assertDefinedAndNotNull("f", testee)();
});

test(name("function works"), () => {
    const result = seq.reduceRight((previous, current) => [previous, current], new Array<any>());

    deepEqual(result, [[[[new Array<any>(), 3], 2], 1], 0]);
});