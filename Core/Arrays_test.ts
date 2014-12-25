/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import Integers = require("Integers");
import Int = Integers.Int;
import Arrays = require("Arrays");
import Array2D = Arrays.Array2D;
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

QUnit.module("Array2D constructor");

test("Get", () => {
    var a = new Array2D(new Int(5), new Int(7));
    new Int(5).each(x => {
        new Int(7).each(y => {
            strictEqual(a.get(x, y), false);
        });
    });
});

test("WidthNonPositive", () =>
    throws(() => new Array2D(new Int(0), new Int(7)),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "No ArgumentException with argument name 'width' is thrown"
        )
    );

test("HeightNonPositive", () =>
    throws(() => new Array2D(new Int(7), new Int(0)),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "No ArgumentException with argument name 'height' is thrown"
        )
    );

var a: Array2D;

QUnit.module("Array2D set", {
    setup: () => { a = new Array2D(new Int(5), new Int(7)); }
});

test("TrueGet", () => {
    a.set(new Int(2), new Int(3), true);
    var p = a.get(new Int(2), new Int(3));

    strictEqual(p, true);
});

test("FalseGet", () => {
    a.set(new Int(2), new Int(3), true);
    a.set(new Int(2), new Int(3), false);
    var p = a.get(new Int(2), new Int(3));

    strictEqual(p, false);
});

QUnit.module("Array2D performance", {
    setup: () => { a = new Array2D(new Int(2000), new Int(2000)); }
});

test("GetPerformancePrepare", () => {
    new Int(1000).each(x => { ; });
    strictEqual(0, 0); // to satisfy qunit
});

test("GetPerformance", () => {
    new Int(1000).each(x => new Int(1000).each(y => a.get(x, y)));
    strictEqual(0, 0); // to satisfy qunit
});

test("getWidth", () => {
    var s = new Array2D(new Int(2), new Int(3));

    strictEqual(s.getWidth().getValue(), 2);
});

test("getHeight", () => {
    var s = new Array2D(new Int(2), new Int(3));

    strictEqual(s.getHeight().getValue(), 3);
});
