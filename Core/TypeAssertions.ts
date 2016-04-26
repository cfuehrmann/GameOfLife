import {ArgumentException} from "./Exceptions";

export function assertInt<T>(argumentName: string, testee: (n: number) => T) {
    return () => {
        assertReal(argumentName, testee)();
        throws(() => testee(0.5),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function assertReal<T>(argumentName: string, testee: (n: number) => T) {
    return () => {
        assertDefinedAndNotNull(argumentName, testee)();
        throws(() => testee(NaN),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => testee(Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => testee(-Infinity),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}

export function assertDefinedAndNotNull<TArgument, TResult>(argumentName: string, testee: (n: TArgument) => TResult) {
    return () => {
        throws(() => testee(null),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
        throws(() => testee(undefined),
        (e: ArgumentException) => e.getArgumentName() === argumentName);
    };
}