define(["require", "exports", "./Exceptions", "./TypeChecks"], function (require, exports, Exceptions, TypeChecks) {
    var ArgumentException = Exceptions.ArgumentException;
    var checkReal = TypeChecks.checkReal;
    function mod(numerator, denominator) {
        checkReal("numerator", numerator);
        checkReal("denominator", denominator);
        if (denominator === 0) {
            throw new ArgumentException("denominator");
        }
        var ad = Math.abs(denominator);
        return ((numerator % ad) + ad) % ad;
    }
    exports.mod = mod;
});
