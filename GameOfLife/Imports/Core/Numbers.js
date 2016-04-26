define(["require", "exports", "./Exceptions", "./TypeChecks"], function (require, exports, Exceptions_1, TypeChecks_1) {
    "use strict";
    function mod(numerator, denominator) {
        TypeChecks_1.checkReal("numerator", numerator);
        TypeChecks_1.checkReal("denominator", denominator);
        if (denominator === 0) {
            throw new Exceptions_1.ArgumentException("denominator");
        }
        var ad = Math.abs(denominator);
        return ((numerator % ad) + ad) % ad;
    }
    exports.mod = mod;
});
