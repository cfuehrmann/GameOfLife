﻿/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Arrays = require("Arrays");
import Array2D = Arrays.Array2D;
import ArgumentException = Exceptions.ArgumentException;
import Exceptions = require("Exceptions");
import TypeChecking = require("TypeChecking");
import checkIntAssert = TypeChecking.checkIntAssert;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + ", " + method + ": " + testCase, testBody);
}

testClass = "Array2D";

method = "constructor";

check("height has int assert",
    checkIntAssert("height", height => new Array2D(height, 7, 0))
    );

check("heightNonPositive", () =>
    throws(() => new Array2D(0, 7, 0),
        (e: ArgumentException) => e.getArgumentName() === "height")
    );

check("width has int assert",
    checkIntAssert("width", width => new Array2D(5, width, 0))
    );

check("widthNonPositive", () =>
    throws(() => new Array2D(7, 0, 0),
        (e: ArgumentException) => e.getArgumentName() === "width")
    );

check("initialValue", () => {
    var a = new Array2D(5, 7, 42);
    for (var row = 0; row < 5; row++) {
        for (var column = 0; column < 5; column++) {
            strictEqual(a.get(row, column), 42);
        }
    }
});


method = "get";

check("row has int assert",
    checkIntAssert("row", row => new Array2D(5, 7, 0).get(row, 3))
    );

check("rowNegative", () =>
    throws(() => { new Array2D(5, 7, 0).get(-1, 3); },
        (e: ArgumentException) => e.getArgumentName() === "row")
    );

check("rowTooGreat", () =>
    throws(() => { new Array2D(5, 7, 0).get(5, 3); },
        (e: ArgumentException) => e.getArgumentName() === "row")
    );

check("column has int assert",
    checkIntAssert("column", column => new Array2D(5, 7, 0).get(3, column))
    );

check("columnNegative", () =>
    throws(() => { new Array2D(5, 7, 0).get(3, -1); },
        (e: ArgumentException) => e.getArgumentName() === "column")
    );

check("columnTooGreat", () =>
    throws(() => { new Array2D(5, 7, 0).get(3, 7); },
        (e: ArgumentException) => e.getArgumentName() === "column")
    );


method = "set";

check("row has int assert",
    checkIntAssert("row", row => new Array2D(5, 7, 0).set(row, 3, 0))
    );

check("rowNegative", () =>
    throws(() => new Array2D(5, 7, 0).set(-1, 3, 42),
        (e: ArgumentException) => e.getArgumentName() === "row")
    );

check("rowTooGreat", () =>
    throws(() => new Array2D(5, 7, 0).set(5, 3, 42),
        (e: ArgumentException) => e.getArgumentName() === "row")
    );

check("column has int assert",
    checkIntAssert("column", column => new Array2D(5, 7, 0).set(3, column, 0))
    );

check("columnNegative", () =>
    throws(() => new Array2D(5, 7, 0).set(3, -1, 42),
        (e: ArgumentException) => e.getArgumentName() === "column")
    );

check("columnTooGreat", () =>
    throws(() => new Array2D(5, 7, 0).set(3, 7, 42),
        (e: ArgumentException) => e.getArgumentName() === "column")
    );

check("once", () => {
    var a = new Array2D(5, 7, 0);
    a.set(2, 3, 42);

    var p = a.get(2, 3);
    strictEqual(p, 42);
});

check("twice", () => {
    var a = new Array2D(5, 7, 0);

    a.set(2, 3, 42);
    a.set(2, 3, 43);

    var p = a.get(2, 3);
    strictEqual(p, 43);
});


method = "get";

var a: Array2D<boolean> = new Array2D(1000, 1000, false);

check("performance", () => {
    for (var x = 0; x < 1000; x++) {
        for (var y = 0; y < 1000; y++) {
            a.get(x, y);
        }
    }
    ok(true); // to satisfy qunit
});

method = "width";

check("width", () => strictEqual(new Array2D(2, 3, false).width, 3));

method = "height";

check("height", () => strictEqual(new Array2D(2, 3, false).height, 2));
