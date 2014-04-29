﻿/// <reference path="../GameOfLife/ArrayScene.ts"/>
/// <reference path="../GameOfLife/ArgumentException.ts"/>
/// <reference path="../packages/qunit.TypeScript.DefinitelyTyped.0.1.1/Content/Scripts/typings/qunit/qunit.d.ts" />

QUnit.module("ArrayScene constructor");

test("Get", () => {
    var a = new ArrayScene(5, 7);

    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 7; y++) {
            strictEqual(a.getPoint(x, y), false);
        }
    }
});

test("WidthNonInteger", () =>
    throws(() => new ArrayScene(1.5, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("WidthNaN", () =>
    throws(() => new ArrayScene(Number.NaN, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("WidthNegativeInfinity", () =>
    throws(() => new ArrayScene(Number.NEGATIVE_INFINITY, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("WidthPositiveInfinity", () =>
    throws(() => new ArrayScene(Number.POSITIVE_INFINITY, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("WidthNonPositive", () =>
    throws(() => new ArrayScene(0, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("HeightNonInteger", () =>
    throws(() => new ArrayScene(7, 1.5),
        (e: ArgumentException) => e.ArgumentName === "height",
        "An ArgumentException with argument name 'height' is thrown")
    );

test("HeightNaN", () =>
    throws(() => new ArrayScene(7, Number.NaN),
        (e: ArgumentException) => e.ArgumentName === "height",
        "An ArgumentException with argument name 'height' is thrown")
    );

test("HeightNegativeInfinity", () =>
    throws(() => new ArrayScene(7, Number.NEGATIVE_INFINITY),
        (e: ArgumentException) => e.ArgumentName === "height",
        "An ArgumentException with argument name 'height' is thrown")
    );

test("HeightPositiveInfinity", () =>
    throws(() => new ArrayScene(7, Number.POSITIVE_INFINITY),
        (e: ArgumentException) => e.ArgumentName === "height",
        "An ArgumentException with argument name 'height' is thrown")
    );

test("HeightNonPositive", () =>
    throws(() => new ArrayScene(7, 0),
        (e: ArgumentException) => e.ArgumentName === "height",
        "An ArgumentException with argument name 'height' is thrown")
    );

var a: IScene;

QUnit.module("ArrayScene setPoint", {
    setup: () => { a = new ArrayScene(5, 7); }
});

test("TrueGet", () => {
    a.setPoint(2, 3, true);
    var p = a.getPoint(2, 3);

    strictEqual(p, true);
});

test("FalseGet", () => {
    a.setPoint(2, 3, true);
    a.setPoint(2, 3, false);
    var p = a.getPoint(2, 3);

    strictEqual(p, false);
});

test("xNonInteger", () => {
    throws(() => a.setPoint(1.5, 7, true),
        (e: ArgumentException) => e.ArgumentName === "x",
        "An ArgumentException with argument name 'x' is thrown");
});

test("xNaN", () => {
    throws(() => a.setPoint(Number.NaN, 7, true),
        (e: ArgumentException) => e.ArgumentName === "x",
        "An ArgumentException with argument name 'x' is thrown");
});

test("xNegativeInfinity", () => {
    throws(() => a.setPoint(Number.NEGATIVE_INFINITY, 7, true),
        (e: ArgumentException) => e.ArgumentName === "x",
        "An ArgumentException with argument name 'x' is thrown");
});

test("xPositiveInfinity", () => {
    throws(() => a.setPoint(Number.POSITIVE_INFINITY, 7, true),
        (e: ArgumentException) => e.ArgumentName === "x",
        "An ArgumentException with argument name 'x' is thrown");
});

test("yNonInteger", () => {
    throws(() => a.setPoint(7, 1.5, true),
        (e: ArgumentException) => e.ArgumentName === "y",
        "An ArgumentException with argument name 'y' is thrown");
});

test("yNaN", () => {
    throws(() => a.setPoint(7, Number.NaN, true),
        (e: ArgumentException) => e.ArgumentName === "y",
        "An ArgumentException with argument name 'y' is thrown");
});

test("yNegativeInfinity", () => {
    throws(() => a.setPoint(7, Number.NEGATIVE_INFINITY, true),
        (e: ArgumentException) => e.ArgumentName === "y",
        "An ArgumentEyception with argument name 'y' is thrown");
});

test("yPositiveInfinity", () => {
    throws(() => a.setPoint(7, Number.POSITIVE_INFINITY, true),
        (e: ArgumentException) => e.ArgumentName === "y",
        "An ArgumentException with argument name 'y' is thrown");
});

QUnit.module("ArrayScene performance", {
    setup: () => { a = new ArrayScene(10000, 10000); }
});

test("GetPerformance", () => {
    var p: boolean;
    for (var x = 0; x < 10000; x++) {
        for (var y = 0; y < 10000; y++) {
            p = p || a.getPoint(x, y);
        }
    }
    strictEqual(p, false);
});

