import { Array2D } from "Arrays";
import { ArgumentException } from "Exceptions";
import { assertInt } from "TypeAssertions";

let functionName: string;
let name = (testCase: string) => `Array2D, ${functionName}: ${testCase}`;


functionName = "constructor";

QUnit.test(name("height when not int"), assert =>
    assertInt("height", height => new Array2D(height, 7, 0))
);

QUnit.test(name("height when not positive"), assert =>
    assert.throws(() => new Array2D(0, 7, 0),
        (e: ArgumentException) => e.getArgumentName() === "height")
);

QUnit.test(name("width when not int"), assert =>
    assertInt("width", width => new Array2D(5, width, 0))
);

QUnit.test(name("width when not positive"), assert =>
    assert.throws(() => new Array2D(7, 0, 0),
        (e: ArgumentException) => e.getArgumentName() === "width")
);

QUnit.test(name("initialValue"), assert => {
    const a = new Array2D(5, 7, 42);
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            assert.strictEqual(a.get(row, column), 42);
        }
    }
});


functionName = "get";

QUnit.test(name("row when not int"), assert =>
    assertInt("row", row => new Array2D(5, 7, 0).get(row, 3))
);

QUnit.test(name("row when negative"), assert =>
    assert.throws(() => { new Array2D(5, 7, 0).get(-1, 3); },
        (e: ArgumentException) => e.getArgumentName() === "row")
);

QUnit.test(name("row when too great"), assert =>
    assert.throws(() => { new Array2D(5, 7, 0).get(5, 3); },
        (e: ArgumentException) => e.getArgumentName() === "row")
);

QUnit.test(name("column when not int"), assert =>
    assertInt("column", column => new Array2D(5, 7, 0).get(3, column))
);

QUnit.test(name("column when negative"), assert =>
    assert.throws(() => { new Array2D(5, 7, 0).get(3, -1); },
        (e: ArgumentException) => e.getArgumentName() === "column")
);

QUnit.test(name("column when too great"), assert =>
    assert.throws(() => { new Array2D(5, 7, 0).get(3, 7); },
        (e: ArgumentException) => e.getArgumentName() === "column")
);


functionName = "set";

QUnit.test(name("row when not int"), assert =>
    assertInt("row", row => new Array2D(5, 7, 0).set(row, 3, 0))
);

QUnit.test(name("row when negative"), assert =>
    assert.throws(() => new Array2D(5, 7, 0).set(-1, 3, 42),
        (e: ArgumentException) => e.getArgumentName() === "row")
);

QUnit.test(name("row when too great"), assert =>
    assert.throws(() => new Array2D(5, 7, 0).set(5, 3, 42),
        (e: ArgumentException) => e.getArgumentName() === "row")
);

QUnit.test(name("column when not int"), assert =>
    assertInt("column", column => new Array2D(5, 7, 0).set(3, column, 0))
);

QUnit.test(name("column when negative"), assert =>
    assert.throws(() => new Array2D(5, 7, 0).set(3, -1, 42),
        (e: ArgumentException) => e.getArgumentName() === "column")
);

QUnit.test(name("column when too great"), assert =>
    assert.throws(() => new Array2D(5, 7, 0).set(3, 7, 42),
        (e: ArgumentException) => e.getArgumentName() === "column")
);

QUnit.test(name("once"), assert => {
    const a = new Array2D(5, 7, 0);
    a.set(2, 3, 42);
    const p = a.get(2, 3);
    assert.strictEqual(p, 42);
});

QUnit.test(name("twice"), assert => {
    const a = new Array2D(5, 7, 0);
    a.set(2, 3, 42);
    a.set(2, 3, 43);
    const p = a.get(2, 3);
    assert.strictEqual(p, 43);
});


functionName = "get";

let a2 = new Array2D(1000, 1000, false);

QUnit.test(name("performance"), assert => {
    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            a2.get(x, y);
        }
    }
    assert.ok(true); // to satisfy qunit
});


functionName = "width";

QUnit.test(name("width"), assert => assert.strictEqual(new Array2D(2, 3, false).width, 3));


functionName = "height";

QUnit.test(name("height"), assert => assert.strictEqual(new Array2D(2, 3, false).height, 2));