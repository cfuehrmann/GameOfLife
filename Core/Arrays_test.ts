/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
import Arrays = require("Arrays");
import Array2D = Arrays.Array2D;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var testClass: string;
var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test(testClass + "_" + method + "_" + testCase, testBody);
}

testClass = "Array2D";
method = "constructor";

check("widthNull", () => {
    throws(() => new Array2D(null, new Int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "width");
});

check("widthUndefined", () => {
    throws(() => new Array2D(null, new Int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "width");
});

check("heightNull", () => {
    throws(() => new Array2D(new Int(7), null, 0),
        (e: ArgumentException) => e.getArgumentName() === "height");
});

check("heightUndefined", () => {
    throws(() => new Array2D(new Int(7), null, 0),
        (e: ArgumentException) => e.getArgumentName() === "height");
});

check("initialValueNull", () => {
    throws(() => new Array2D(new Int(7), new Int(7), null),
        (e: ArgumentException) => e.getArgumentName() === "initialValue");
});

check("initialValueUndefined", () => {
    throws(() => new Array2D(new Int(7), new Int(7), undefined),
        (e: ArgumentException) => e.getArgumentName() === "initialValue");
});

check("widthNonPositive", () =>
    throws(() => new Array2D(new Int(0), new Int(7), 0),
        (e: ArgumentException) => e.getArgumentName() === "width")
    );

check("heightNonPositive", () =>
    throws(() => new Array2D(new Int(7), new Int(0), 0),
        (e: ArgumentException) => e.getArgumentName() === "height")
    );

check("initialValue", () => {
    var a = new Array2D(new Int(5), new Int(7), 42);
    new Int(5).each(x => {
        new Int(7).each(y => {
            strictEqual(a.get(x, y), 42);
        });
    });
});

method = "get";

check("xUndefined", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.get(undefined, new Int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "x");
});

check("yUndefined", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.get(new Int(3), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "y");
});

check("xNull", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.get(null, new Int(3)); },
        (e: ArgumentException) => e.getArgumentName() === "x");
});

check("yNull", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.get(new Int(3), null); },
        (e: ArgumentException) => e.getArgumentName() === "y");
});

method = "set";

check("xUndefined", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(undefined, new Int(3), 0); },
        (e: ArgumentException) => e.getArgumentName() === "x");
});

check("yUndefined", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(new Int(3), undefined, 0); },
        (e: ArgumentException) => e.getArgumentName() === "y");
});

check("valueUndefined", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(new Int(3), new Int(7), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "value");
});

check("xNull", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(null, new Int(3), 0); },
        (e: ArgumentException) => e.getArgumentName() === "x");
});

check("yNull", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(new Int(3), null, 0); },
        (e: ArgumentException) => e.getArgumentName() === "y");
});

check("valueNull", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    throws(() => { a.set(new Int(3), new Int(7), undefined); },
        (e: ArgumentException) => e.getArgumentName() === "value");
});
check("once", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);
    a.set(new Int(2), new Int(3), 42);

    var p = a.get(new Int(2), new Int(3));
    strictEqual(p, 42);
});

check("twice", () => {
    var a = new Array2D(new Int(5), new Int(7), 0);

    a.set(new Int(2), new Int(3), 42);
    a.set(new Int(2), new Int(3), 43);

    var p = a.get(new Int(2), new Int(3));
    strictEqual(p, 43);
});

method = "get";

var a: Array2D<boolean>;

check("performancePrepare", () => {
    a = new Array2D(new Int(1000), new Int(1000), false);
    new Int(1000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

check("performance", () => {
    new Int(1000).each(x => new Int(1000).each(y => a.get(x, y)));
    strictEqual(0, 0); // to satisfy qunit
});

method = "getWidth";

check("getWidth", () => {
    var s = new Array2D(new Int(2), new Int(3), false);

    strictEqual(s.getWidth().getValue(), 2);
});

method = "getHeight";

check("getHeight", () => {
    var s = new Array2D(new Int(2), new Int(3), false);

    strictEqual(s.getHeight().getValue(), 3);
});
