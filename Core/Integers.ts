/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export function mod(numerator: number, denominator: number) {
    if (!isFinite(numerator) || numerator == null) {
        throw new ArgumentException("numerator");
    }
    if (!isFinite(denominator) || denominator == null || denominator === 0) {
        throw new ArgumentException("denominator");
    }
    var ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
}

export function isNoInt(value: number) {
    return value % 1 !== 0 || value == null;
}
