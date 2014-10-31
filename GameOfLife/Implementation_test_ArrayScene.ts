/// <reference path="Imports/QUnit/qunit.d.ts" />

import Integers = require("Imports/Core/Integers");
import Int = Integers.Int;
import Sequences = require("Imports/Core/Sequences");
import Seq = Sequences.Seq;
import EagerRange = Integers.EagerRange;
import Interface = require("Interface");
import Scene = Interface.Scene;
import Implementation = require("Implementation");
import ArrayScene = Implementation.ArrayScene;
import Exceptions = require("Imports/Core/Exceptions");
import ArgumentException = Exceptions.ArgumentException;

QUnit.module("ArrayScene constructor");

test("Get", () => {
    var a = new ArrayScene(new Int(5), new Int(7));

    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 7; y++) {
            strictEqual(a.getPoint(new Int(x), new Int(y)), false);
        }
    }
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

var a: Scene;

QUnit.module("ArrayScene setPoint", {
    setup: () => { a = new ArrayScene(new Int(5), new Int(7)); }
});

test("TrueGet", () => {
    a.setPoint(new Int(2), new Int(3), true);
    var p = a.getPoint(new Int(2), new Int(3));

    strictEqual(p, true);
});

test("FalseGet", () => {
    a.setPoint(new Int(2), new Int(3), true);
    a.setPoint(new Int(2), new Int(3), false);
    var p = a.getPoint(new Int(2), new Int(3));

    strictEqual(p, false);
});

QUnit.module("ArrayScene performance", {
    setup: () => { a = new ArrayScene(new Int(2000), new Int(2000)); }
});

test("GetPerformanceWithInt", () => {
    var range: Seq<Int> = new EagerRange(new Int(2000));
    var startTime = new Date().getTime();

    range.For(x => range.For(y => a.getPoint(x, y)));

    var duration = new Date().getTime() - startTime;
    strictEqual(false, false, "Duration: " + duration);
});

// test("GetUnsafePerformance", () => {
//    var startTime = new Date().getTime();
//    for (var x = 0; x < 2000; x++) {
//        for (var y = 0; y < 2000; y++) {
//            a.getPoint(x, y);
//        }
//    }
//    var duration = new Date().getTime() - startTime;
//    strictEqual(false, false, "Duration: " + duration);
// });

test("getWidth", () => {
    var s: Scene = new ArrayScene(new Int(42), new Int(43));

    strictEqual(s.getWidth().getValue(), 42);
});

test("getHeight", () => {
    var s: Scene = new ArrayScene(new Int(42), new Int(43));

    strictEqual(s.getHeight().getValue(), 43);
});