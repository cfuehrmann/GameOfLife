/* At runtime, karma provides the qunit implementation from node_modules.
 * The reference here is only to satisfy the typescript compiler. Interestingly,
 * having the reference in one place eliminates the need to add it anywhere else.
 */
/// <reference path="Imports/QUnit/qunit.d.ts" />

import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;

export function assertInt(argumentName: string, value: number) {
    if (value % 1 !== 0 || value == null) {
        throw new ArgumentException(argumentName);
    }
}

export function assertReal(argumentName: string, value: number) {
    if (!isFinite(value) || value == null) {
        throw new ArgumentException(argumentName);
    }
}

export function assertDefinedAndNotNull(argumentName: string, value: any) {
    if (typeof (value) === "undefined" || value == null) {
        throw new ArgumentException(argumentName);
    }
}


export function checkIntAssert<T>(argumentName: string, method: (n: number) => T) {
    return () => {
        checkRealAssert(argumentName, method)();
        throws(() => method(0.5),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function checkRealAssert<T>(argumentName: string, method: (n: number) => T) {
    return () => {
        checkDefinedAndNotNullAssert(argumentName, method)();
        throws(() => method(NaN),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function checkDefinedAndNotNullAssert<TArgument, TResult>(argumentName: string, method: (n: TArgument) => TResult) {
    return () => {
        throws(() => method(null),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(undefined),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}