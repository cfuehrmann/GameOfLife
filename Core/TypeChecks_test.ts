/* At runtime, karma provides the qunit implementation from node_modules.
 * The reference here is only to satisfy the typescript compiler. Interestingly,
 * having the reference in one place eliminates the need to add it anywhere else.
 */
/// <reference path="Imports/QUnit/qunit.d.ts" />
import { checkInt } from "TypeChecks";
import { ArgumentException } from "Exceptions";

let functionName: string;
let name = (testCaseName: string) => `TypeChecks, ${functionName}: ${testCaseName}`;

functionName = "assertInt";

QUnit.test(name("value is undefined"), assert =>
    assert.throws(
        () => checkInt("foo", 0.5),
        (e: ArgumentException) => e.getArgumentName() === "foo"
    )
);

// todo: add more tests