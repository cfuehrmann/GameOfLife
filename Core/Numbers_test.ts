import Numbers = require("Numbers");
import Exceptions = require("Exceptions");
import TypeChecking = require("TypeChecking");
import ArgumentException = Exceptions.ArgumentException;
import checkRealAssert = TypeChecking.checkRealAssert;

let method: string;
let name = (testCase: string) => "Numbers, " + method + ": " + testCase;


method = "mod";

test(name("numerator when not real"),
    checkRealAssert("numerator", numerator => Numbers.mod(numerator, 1))
);

test(name("numerator when negative"), () =>
    strictEqual(Numbers.mod(-2, 5), 3)
);

test(name("denominator when not real"),
    checkRealAssert("denominator", denominator => Numbers.mod(1, denominator))
);

test(name("denominator when 0"), () =>
    throws(() => Numbers.mod(1, 0),
    (e: ArgumentException) => e.getArgumentName() === "denominator")
);

test(name("numerator when positive real and denominator when positive real"), () =>
    strictEqual(Numbers.mod(7.3, 2.5), 2.3)
);

test(name("numerator when negative real and denominator when positive real"), () =>
    strictEqual(Numbers.mod(-4, 3), 2)
);

test(name("numerator when positive real and denominator when negative real"), () =>
    strictEqual(Numbers.mod(5, -3), 2)
);