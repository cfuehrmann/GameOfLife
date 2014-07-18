/// <reference path="../GameOfLife/ArrayScene.ts"/>
/// <reference path="../GameOfLife/ArgumentException.ts"/>
/// <reference path="Imports/QUnit/qunit.d.ts" />

import Integers = require('Int');
import Int = Integers.Int;
import XXX = require('IScene');
import IScene = XXX.IScene;
import YYY = require('ArrayScene');
import ArrayScene = YYY.ArrayScene;
import ZZZ = require('ArgumentException');
import ArgumentException = ZZZ.ArgumentException;

QUnit.module("ArrayScene constructor");

test("Get", () => {
    var a = new ArrayScene(5, 7);

    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 7; y++) {
            strictEqual(a.getPoint(new Int(x), new Int(y)), false);
        }
    }
});

test("WidthNonInteger", () =>
    throws(() => new ArrayScene(1.5, 7),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "An ArgumentException with argument name 'width' is thrown"
        )
    );

test("WidthNaN", () =>
    throws(() => new ArrayScene(Number.NaN, 7),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "An ArgumentException with argument name 'width' is thrown"
        )
    );

test("WidthNegativeInfinity", () =>
    throws(() => new ArrayScene(Number.NEGATIVE_INFINITY, 7),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "An ArgumentException with argument name 'width' is thrown"
        )
    );

test("WidthPositiveInfinity", () =>
    throws(() => new ArrayScene(Number.POSITIVE_INFINITY, 7),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "An ArgumentException with argument name 'width' is thrown"
        )
    );

test("WidthNonPositive", () =>
    throws(() => new ArrayScene(0, 7),
        (e: ArgumentException) => e.getArgumentName() === "width",
        "An ArgumentException with argument name 'width' is thrown"
        )
    );

test("HeightNonInteger", () =>
    throws(() => new ArrayScene(7, 1.5),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "An ArgumentException with argument name 'height' is thrown"
        )
    );

test("HeightNaN", () =>
    throws(() => new ArrayScene(7, Number.NaN),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "An ArgumentException with argument name 'height' is thrown"
        )
    );

test("HeightNegativeInfinity", () =>
    throws(() => new ArrayScene(7, Number.NEGATIVE_INFINITY),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "An ArgumentException with argument name 'height' is thrown"
        )
    );

test("HeightPositiveInfinity", () =>
    throws(() => new ArrayScene(7, Number.POSITIVE_INFINITY),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "An ArgumentException with argument name 'height' is thrown"
        )
    );

test("HeightNonPositive", () =>
    throws(() => new ArrayScene(7, 0),
        (e: ArgumentException) => e.getArgumentName() === "height",
        "An ArgumentException with argument name 'height' is thrown"
        )
    );

var a: IScene;

QUnit.module("ArrayScene setPoint", {
    setup: () => { a = new ArrayScene(5, 7); }
});

test("TrueGet", () => {
    a.setPoint(2, 3, true);
    var p = a.getPoint(new Int(2), new Int(3));

    strictEqual(p, true);
});

test("FalseGet", () => {
    a.setPoint(2, 3, true);
    a.setPoint(2, 3, false);
    var p = a.getPoint(new Int(2), new Int(3));

    strictEqual(p, false);
});

test("xNonInteger", () => {
    throws(() => a.setPoint(1.5, 7, true),
        (e: ArgumentException) => e.getArgumentName() === "x",
        "An ArgumentException with argument name 'x' is thrown"
        );
});

test("xNaN", () => {
    throws(() => a.setPoint(Number.NaN, 7, true),
        (e: ArgumentException) => e.getArgumentName() === "x",
        "An ArgumentException with argument name 'x' is thrown"
        );
});

test("xNegativeInfinity", () => {
    throws(() => a.setPoint(Number.NEGATIVE_INFINITY, 7, true),
        (e: ArgumentException) => e.getArgumentName() === "x",
        "An ArgumentException with argument name 'x' is thrown"
        );
});

test("xPositiveInfinity", () => {
    throws(() => a.setPoint(Number.POSITIVE_INFINITY, 7, true),
        (e: ArgumentException) => e.getArgumentName() === "x",
        "An ArgumentException with argument name 'x' is thrown"
        );
});

test("yNonInteger", () => {
    throws(() => a.setPoint(7, 1.5, true),
        (e: ArgumentException) => e.getArgumentName() === "y",
        "An ArgumentException with argument name 'y' is thrown"
        );
});

test("yNaN", () => {
    throws(() => a.setPoint(7, Number.NaN, true),
        (e: ArgumentException) => e.getArgumentName() === "y",
        "An ArgumentException with argument name 'y' is thrown"
        );
});

test("yNegativeInfinity", () => {
    throws(() => a.setPoint(7, Number.NEGATIVE_INFINITY, true),
        (e: ArgumentException) => e.getArgumentName() === "y",
        "An ArgumentEyception with argument name 'y' is thrown"
        );
});

test("yPositiveInfinity", () => {
    throws(() => a.setPoint(7, Number.POSITIVE_INFINITY, true),
        (e: ArgumentException) => e.getArgumentName() === "y",
        "An ArgumentException with argument name 'y' is thrown"
        );
});

QUnit.module("ArrayScene performance", {
    setup: () => { a = new ArrayScene(2000, 2000); }
});

test("GetPerformanceWithInt", () => {
    var range = new Int(2000).getRange();
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
