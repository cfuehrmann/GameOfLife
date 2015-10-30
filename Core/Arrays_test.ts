﻿import Arrays = require("Arrays");
import Exceptions = require("Exceptions");
import TypeAssertions = require("TypeAssertions");
import Array2D = Arrays.Array2D;
import ArgumentException = Exceptions.ArgumentException;
import assertInt = TypeAssertions.assertInt;

let functionName: string;
let name = (testCase: string) => "Array2D, " + functionName + ": " + testCase;


functionName = "constructor";

test(name("height when not int"),
    assertInt("height", height => new Array2D(height, 7, 0))
);

test(name("height when not positive"), () =>
    throws(() => new Array2D(0, 7, 0),
    (e: ArgumentException) => e.getArgumentName() === "height")
);

test(name("width when not int"),
    assertInt("width", width => new Array2D(5, width, 0))
);

test(name("width when not positive"), () =>
    throws(() => new Array2D(7, 0, 0),
    (e: ArgumentException) => e.getArgumentName() === "width")
);

test(name("initialValue"), () => {
    const a = new Array2D(5, 7, 42);
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            strictEqual(a.get(row, column), 42);
        }
    }
});


functionName = "get";

test(name("row when not int"),
    assertInt("row", row => new Array2D(5, 7, 0).get(row, 3))
);

test(name("row when negative"), () =>
    throws(() => { new Array2D(5, 7, 0).get(-1, 3); },
    (e: ArgumentException) => e.getArgumentName() === "row")
);

test(name("row when too great"), () =>
    throws(() => { new Array2D(5, 7, 0).get(5, 3); },
    (e: ArgumentException) => e.getArgumentName() === "row")
);

test(name("column when not int"),
    assertInt("column", column => new Array2D(5, 7, 0).get(3, column))
);

test(name("column when negative"), () =>
    throws(() => { new Array2D(5, 7, 0).get(3, -1); },
    (e: ArgumentException) => e.getArgumentName() === "column")
);

test(name("column when too great"), () =>
    throws(() => { new Array2D(5, 7, 0).get(3, 7); },
    (e: ArgumentException) => e.getArgumentName() === "column")
);


functionName = "set";

test(name("row when not int"),
    assertInt("row", row => new Array2D(5, 7, 0).set(row, 3, 0))
);

test(name("row when negative"), () =>
    throws(() => new Array2D(5, 7, 0).set(-1, 3, 42),
    (e: ArgumentException) => e.getArgumentName() === "row")
);

test(name("row when too great"), () =>
    throws(() => new Array2D(5, 7, 0).set(5, 3, 42),
    (e: ArgumentException) => e.getArgumentName() === "row")
);

test(name("column when not int"),
    assertInt("column", column => new Array2D(5, 7, 0).set(3, column, 0))
);

test(name("column when negative"), () =>
    throws(() => new Array2D(5, 7, 0).set(3, -1, 42),
    (e: ArgumentException) => e.getArgumentName() === "column")
);

test(name("column when too great"), () =>
    throws(() => new Array2D(5, 7, 0).set(3, 7, 42),
    (e: ArgumentException) => e.getArgumentName() === "column")
);

test(name("once"), () => {
    const a = new Array2D(5, 7, 0);
    a.set(2, 3, 42);
    const p = a.get(2, 3);
    strictEqual(p, 42);
});

test(name("twice"), () => {
    const a = new Array2D(5, 7, 0);
    a.set(2, 3, 42);
    a.set(2, 3, 43);
    const p = a.get(2, 3);
    strictEqual(p, 43);
});


functionName = "get";

let a2 = new Array2D(1000, 1000, false);

test(name("performance"), () => {
    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            a2.get(x, y);
        }
    }
    ok(true); // to satisfy qunit
});


functionName = "width";

test(name("width"), () => strictEqual(new Array2D(2, 3, false).width, 3));


functionName = "height";

test(name("height"), () => strictEqual(new Array2D(2, 3, false).height, 2));