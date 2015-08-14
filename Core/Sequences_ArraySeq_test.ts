import Sequences = require("Sequences");
import TypeChecking = require("TypeChecking");
import checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
import ArraySeq = Sequences.ArraySeq;

var seq: Sequences.Seq<number>; // "var" because otherwise R# makes a type inference error

let method: string;
let name = (testCaseName: string) => "ArraySeq, " + method + ": " + testCaseName;

QUnit.testStart(() => {
    seq = new ArraySeq([0, 1, 2, 3]);
});


method = "constructor";

test(name("Argument is defined"),
    checkDefinedAndNotNullAssert("seq", (seq: number[]) => new ArraySeq(seq))
);


method = "filter";

test(name("Argument is defined"), () => {
    checkDefinedAndNotNullAssert("condition", seq.filter)();
});

test(name("method works"), () => {
    const result = seq.filter(n => [1, 3].indexOf(n) >= 0).toArray();

    deepEqual(result, [1, 3]);
});


method = "map";

test(name("Argument is defined"), () => {
    checkDefinedAndNotNullAssert("transform", seq.map)();
});

test(name("method works"), () => {
    const result = seq.map(element => 2 * element);

    deepEqual(result.toArray(), [0, 2, 4, 6]);
});


method = "reduceRight";

test(name("Argument is defined"), () => {
    const testee = (f: (previous: number, current: number) => number) => seq.reduceRight(f, 42);

    checkDefinedAndNotNullAssert("f", testee)();
});

test(name("method works"), () => {
    const result = seq.reduceRight((previous, current) => [previous, current], new Array<any>());

    deepEqual(result, [[[[new Array<any>(), 3], 2], 1], 0]);
});