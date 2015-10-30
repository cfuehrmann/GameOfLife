import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;

export function checkInt(argumentName: string, value: number) {
    if (value % 1 !== 0 || value == null) {
        throw new ArgumentException(argumentName);
    }
}

export function checkReal(argumentName: string, value: number) {
    if (!isFinite(value) || value == null) {
        throw new ArgumentException(argumentName);
    }
}

export function checkDefinedAndNotNull(argumentName: string, value: any) {
    if (typeof (value) === "undefined" || value == null) {
        throw new ArgumentException(argumentName);
    }
}


export function assertInt<T>(argumentName: string, method: (n: number) => T) {
    return () => {
        assertReal(argumentName, method)();
        throws(() => method(0.5),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function assertReal<T>(argumentName: string, method: (n: number) => T) {
    return () => {
        assertDefinedAndNotNull(argumentName, method)();
        throws(() => method(NaN),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function assertDefinedAndNotNull<TArgument, TResult>(argumentName: string, method: (n: TArgument) => TResult) {
    return () => {
        throws(() => method(null),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => method(undefined),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}