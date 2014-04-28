/// <reference path="../GameOfLife/ArrayScene.ts"/>
/// <reference path="../GameOfLife/ArgumentException.ts"/>
/// <reference path="../packages/qunit.TypeScript.DefinitelyTyped.0.1.1/Content/Scripts/typings/qunit/qunit.d.ts" />

test("ConstructorGet", () => {
    var a = new ArrayScene(5, 7);

    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 7; y++) {
            strictEqual(a.getPoint(x, y), false);
        }
    }
});

test("ConstructorNonIntegerWidth", () =>
    throws(() => new ArrayScene(1.5, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("ConstructorNaN", () =>
    throws(() => new ArrayScene(Number.NaN, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("ConstructorNegativeInfinity", () =>
    throws(() => new ArrayScene(Number.NEGATIVE_INFINITY, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("ConstructorPositiveInfinity", () =>
    throws(() => new ArrayScene(Number.POSITIVE_INFINITY, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("ConstructorNonPositiveWidth", () =>
    throws(() => new ArrayScene(0, 7),
        (e: ArgumentException) => e.ArgumentName === "width",
        "An ArgumentException with argument name 'width' is thrown")
    );

test("SetTrueGet", () => {
    var a = new ArrayScene(5, 7);

    a.setPoint(2, 3, true);
    var p = a.getPoint(2, 3);

    strictEqual(p, true);
});

test("SetFalseGet", () => {
    var a = new ArrayScene(5, 7);
    a.setPoint(2, 3, true);

    a.setPoint(2, 3, false);
    var p = a.getPoint(2, 3);

    strictEqual(p, false);
});


