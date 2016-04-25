import * as Exceptions from "./Exceptions";
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