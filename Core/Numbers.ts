﻿import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
import TypeChecking = require("./TypeChecking");
import assertReal = TypeChecking.assertReal;

export function mod(numerator: number, denominator: number) {
    assertReal("numerator", numerator); assertReal("denominator", denominator);
    if (denominator === 0) {
        throw new ArgumentException("denominator");
    }
    const ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
}
