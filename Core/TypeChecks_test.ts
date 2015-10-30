/* At runtime, karma provides the qunit implementation from node_modules.
 * The reference here is only to satisfy the typescript compiler. Interestingly,
 * having the reference in one place eliminates the need to add it anywhere else.
 */
/// <reference path="Imports/QUnit/qunit.d.ts" />
import TypeChecks = require("TypeChecks");
import Exceptions = require("Exceptions");
import checkInt = TypeChecks.checkInt;
import ArgumentException = Exceptions.ArgumentException;

let method: string;
let name = (testCaseName: string) => "TypeChecks, " + method + ": " + testCaseName;

method = "assertInt";

test(name("value is undefined"),
    () => throws(
        () => checkInt("foo", undefined),
        (e: ArgumentException) => e.getArgumentName() === "foo"
    )
);

test(name("value is null"),
    () => throws(
        () => checkInt("foo", null),
        (e: ArgumentException) => e.getArgumentName() === "foo"
    )
);

// todo: add more tests