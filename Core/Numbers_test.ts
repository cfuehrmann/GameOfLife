import * as Numbers from "Numbers";
import { ArgumentException } from "Exceptions";
import { assertReal } from "TypeAssertions";

let functionName: string;
let name = (testCase: string) => `Numbers, ${functionName}: ${testCase}`;


functionName = "mod";

QUnit.test(name("numerator when not real"), assert =>
    assertReal("numerator", numerator => Numbers.mod(numerator, 1))
);

QUnit.test(name("numerator when negative"), assert =>
    assert.strictEqual(Numbers.mod(-2, 5), 3)
);

QUnit.test(name("denominator when not real"), assert =>
    assertReal("denominator", denominator => Numbers.mod(1, denominator))
);

QUnit.test(name("denominator when 0"), assert =>
    assert.throws(() => Numbers.mod(1, 0),
        (e: ArgumentException) => e.getArgumentName() === "denominator")
);

QUnit.test(name("numerator when positive real and denominator when positive real"), assert =>
    assert.strictEqual(Numbers.mod(7.3, 2.5), 2.3)
);

QUnit.test(name("numerator when negative real and denominator when positive real"), assert =>
    assert.strictEqual(Numbers.mod(-4, 3), 2)
);

QUnit.test(name("numerator when positive real and denominator when negative real"), assert =>
    assert.strictEqual(Numbers.mod(5, -3), 2)
);