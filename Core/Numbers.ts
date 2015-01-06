/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import TypeChecking = require("./TypeChecking");
import assertReal = TypeChecking.assertReal;
/* tslint:enable no-unused-variable*/

export function mod(numerator: number, denominator: number) {
    assertReal("numerator", numerator); assertReal("denominator", denominator);
    if (denominator === 0) {
        throw new ArgumentException("denominator");
    }
    var ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
}
