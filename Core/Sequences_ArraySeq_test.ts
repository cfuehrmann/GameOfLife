import { createArraySeq, Seq } from "Sequences";
import { assertDefinedAndNotNull } from "TypeAssertions";

let seq: Seq<number>;

let functionName: string;
let name = (testCaseName: string) => `ArraySeq, ${functionName}: ${testCaseName}`;

QUnit.testStart(details => {
    seq = createArraySeq([0, 1, 2, 3]);
});


functionName = "constructor";

QUnit.test(name("Argument is defined"), assert =>
    assertDefinedAndNotNull("seq", createArraySeq)
);


functionName = "filter";

QUnit.test(name("Argument is defined"), assert =>
    assertDefinedAndNotNull("condition", seq.filter)
);

QUnit.test(name("function works"), assert => {
    const result = seq.filter(n => [1, 3].indexOf(n) >= 0).toArray();

    assert.deepEqual(result, [1, 3]);
});


functionName = "map";

QUnit.test(name("Argument is defined"), assert =>
    assertDefinedAndNotNull("transform", seq.map)
);

QUnit.test(name("function works"), assert => {
    const result = seq.map(element => 2 * element);

    assert.deepEqual(result.toArray(), [0, 2, 4, 6]);
});


functionName = "reduceRight";

QUnit.test(name("Argument is defined"), assert => {
    const testee = (f: (previous: number, current: number) => number) => seq.reduceRight(f, 42);

    assertDefinedAndNotNull("f", testee);
});

QUnit.test(name("function works"), assert => {
    const result = seq.reduceRight((previous, current) => [previous, current], new Array<any>());

    assert.deepEqual(result, [[[[new Array<any>(), 3], 2], 1], 0]);
});