import {ArgumentException} from "./Exceptions";
import {checkReal} from "./TypeChecks";

export function mod(numerator: number, denominator: number) {
    checkReal("numerator", numerator); checkReal("denominator", denominator);
    if (denominator === 0) {
        throw new ArgumentException("denominator");
    }
    const ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
}