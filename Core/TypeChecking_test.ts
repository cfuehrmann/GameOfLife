import TypeChecking = require("TypeChecking");
import Exceptions = require("Exceptions");
import assertInt = TypeChecking.assertInt;
import ArgumentException = Exceptions.ArgumentException;

let method: string;
let name = (testCaseName: string) => "TypeChecking, " + method + ": " + testCaseName;

method = "assertInt";

test(name("value is undefined"),
    () => throws(
        () => assertInt("foo", undefined),
        (e: ArgumentException) => e.getArgumentName() === "foo"
    )
);

test(name("value is null"),
    () => throws(
        () => assertInt("foo", null),
        (e: ArgumentException) => e.getArgumentName() === "foo"
    )
    );

// todo: add more tests