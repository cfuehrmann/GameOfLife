/// <reference path="Imports/QUnit/qunit.d.ts" />

/* tslint:disable no-unused-variable*/
import List = require("List");
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

var method: string;

function check(testCase: string, testBody: (assert?: QUnitAssert) => any) {
    test("List" + ", " + method + ": " + testCase, testBody);
}


method = "from";

check("array is null", () => {
    throws(() =>
        List.from(null),
        (e: ArgumentException) => e.getArgumentName() === "array");
});

check("array is undefined", () => {
    throws(() =>
        List.from(undefined),
        (e: ArgumentException) => e.getArgumentName() === "array");
});

method = "fold";

check("func is null", () => {
    throws(() =>
        List.from([]).fold(0, null),
        (e: ArgumentException) => e.getArgumentName() === "func");
});

check("func is undefined", () => {
    throws(() =>
        List.from([]).fold(0, undefined),
        (e: ArgumentException) => e.getArgumentName() === "func");
});

check("empty list", () => {
    strictEqual(
        List.from([]).fold(42, (result, element) => result + 999),
        42);
});

check("startvalue is null", () => {
    strictEqual(
        List.from([]).fold(null, (result, element) => 42),
        null);
});

check("startvalue is undefined", () => {
    strictEqual(
        List.from([]).fold(undefined, (result, element) => 42),
        undefined);
});

check("func is applied", () => {
    deepEqual(
        List.from([1, 2, 3]).fold([], (result, element) => [result, element]),
        [[[[], 1], 2], 3]);
});


method = "map";

check("func is applied", () => {
    deepEqual(
        List.from([1, 2, 3]).map(element => element + "" + element),
        List.from(["11", "22", "33"]));
});

check("func is null", () => {
    throws(() =>
        List.from([]).map(null),
        (e: ArgumentException) => e.getArgumentName() === "func");
});

check("func is undefined", () => {
    throws(() =>
        List.from([]).map(undefined),
        (e: ArgumentException) => e.getArgumentName() === "func");
});