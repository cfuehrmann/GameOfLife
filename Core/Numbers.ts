import * as Exceptions from "./Exceptions";
import * as TypeChecks from "./TypeChecks";
import ArgumentException = Exceptions.ArgumentException;
import checkReal = TypeChecks.checkReal;

export function mod(numerator: number, denominator: number) {
    checkReal("numerator", numerator); checkReal("denominator", denominator);
    if (denominator === 0) {
        throw new ArgumentException("denominator");
    }
    const ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
}