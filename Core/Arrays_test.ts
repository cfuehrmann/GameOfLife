/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
import Arrays = require("Arrays");
import Array2D = Arrays.Array2D;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import int = Integers.int;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "Array2D";
method = "constructor";

check("widthNull", () => {
    throws(() => new Array2D(int(7), null, 0),
        (e: ArgumentException) => e.getArgumentName() === "width");
});

check("widthUndefined", () => {
    throws(() => new Array2D(int(7), undefined, 0),
        (e: ArgumentException) => e.getArgumentName() === "width");
});

check("heightNull", () => {
    throws(() => new Array2D(null, int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "height");
});

check("heightUndefined", () => {
    throws(() => new Array2D(undefined, int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "height");
});

check("initialValueNull", () => {
    throws(() => new Array2D(int(7), int(7), null),
        (e: ArgumentException) => e.getArgumentName() === "initialValue");
});

check("initialValueUndefined", () => {
    throws(() => new Array2D(int(7), int(7), undefined),
        (e: ArgumentException) => e.getArgumentName() === "initialValue");
});

check("widthNonPositive", () =>
    throws(() => new Array2D(int(7), int(0), 0),
        (e: ArgumentException) => e.getArgumentName() === "width")
    );

check("heightNonPositive", () =>
    throws(() => new Array2D(int(0), int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "height")
    );

check("initialValue", () => {
    var a = new Array2D(int(5), int(7), 42);
    int(5).each(row => {
        int(7).each(column => {
            strictEqual(a.get(row, column), 42);
        });
    });
});

method = "get";

check("rowUndefined", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(undefined, int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnUndefined", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(3), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("rowNull", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(null, int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnNull", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(3), null); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("rowNegative", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(-1), int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("rowTooGreat", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(5), int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnNegative", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(3), int(-1)); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("columnTooGreat", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.get(int(3), int(7)); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});


method = "set";

check("rowUndefined", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(undefined, int(3), 0); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnUndefined", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), undefined, 0); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("valueUndefined", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), int(7), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "value");
});

check("rowNull", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(null, int(3), 0); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnNull", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), null, 0); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("valueNull", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), int(7), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "value");
});

check("rowNegative", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(-1), int(3), 42); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("rowTooGreat", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(5), int(3), 42); },
        (e: ArgumentException) => e.getArgumentName() === "row");
});

check("columnNegative", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), int(-1), 42); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("columnTooGreat", () => {
    var a = new Array2D(int(5), int(7), 0);

    throws(() => { a.set(int(3), int(7), 42); },
        (e: ArgumentException) => e.getArgumentName() === "column");
});

check("once", () => {
    var a = new Array2D(int(5), int(7), 0);
    a.set(int(2), int(3), 42);

    var p = a.get(int(2), int(3));
    strictEqual(p, 42);
});

check("twice", () => {
    var a = new Array2D(int(5), int(7), 0);

    a.set(int(2), int(3), 42);
    a.set(int(2), int(3), 43);

    var p = a.get(int(2), int(3));
    strictEqual(p, 43);
});

method = "get";

var a: Array2D<boolean>;

check("performancePrepare", () => {
    a = new Array2D(int(1000), int(1000), false);
    int(1000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

check("performance", () => {
    int(1000).each(x => int(1000).each(y => a.get(x, y)));
    strictEqual(0, 0); // to satisfy qunit
});

method = "getWidth";

check("getWidth", () => {
    var s = new Array2D(int(2), int(3), false);

    strictEqual(s.getWidth().getValue(), 3);
});

method = "getHeight";

check("getHeight", () => {
    var s = new Array2D(int(2), int(3), false);

    strictEqual(s.getHeight().getValue(), 2);
});
