/// <reference path="Imports/QUnit/qunit.d.ts" />

import Integers = require("Imports/Core/Integers");
import Int = Integers.Int;
import EagerRange = Integers.EagerRange;
import Implementation = require("Implementation");
import ArrayScene = Implementation.ArrayScene;
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;

QUnit.module("ArrayScene constructor");

test("Get", () => {
    var a = new ArrayScene(new Int(5), new Int(7));

    new Int(5).each(x => {
        new Int(7).each(y => {
            strictEqual(a.get(x, y), false);
        });
    });
});

test("WidthNonPositive", () =>
    throws(() => new ArrayScene(new Int(0), new Int(7)),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "No ArgumentException with argument name 'width' is thrown"
        )
    );

test("HeightNonPositive", () =>
    throws(() => new ArrayScene(new Int(7), new Int(0)),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "No ArgumentException with argument name 'height' is thrown"
        )
    );

var a: ArrayScene;

QUnit.module("ArrayScene set", {
    setup: () => { a = new ArrayScene(new Int(5), new Int(7)); }
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

QUnit.module("ArrayScene performance", {
    setup: () => { a = new ArrayScene(new Int(2000), new Int(2000)); }
});

test("GetPerformanceWithInt", () => {
    var range = new EagerRange(new Int(2000));
    var startTime = new Date().getTime();

    range.For(x => range.For(y => a.get(x, y)));

    var duration = new Date().getTime() - startTime;
    strictEqual(false, false, "Duration: " + duration);
});

test("getWidth", () => {
    var s = new ArrayScene(new Int(42), new Int(43));

    strictEqual(s.getWidth().getValue(), 42);
});

test("getHeight", () => {
    var s = new ArrayScene(new Int(42), new Int(43));

    strictEqual(s.getHeight().getValue(), 43);
});