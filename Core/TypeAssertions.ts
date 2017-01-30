import { ArgumentException } from "./Exceptions";

export function assertInt<T>(argumentName: string, testee: (n: number) => T) {
    assertReal(argumentName, testee);
    QUnit.assert.throws(() => testee(0.5),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
}

export function assertReal<T>(argumentName: string, testee: (n: number) => T) {
    QUnit.assert.throws(() => testee(NaN),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    QUnit.assert.throws(() => testee(Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    QUnit.assert.throws(() => testee(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
}