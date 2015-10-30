define(["require", "exports", "./Exceptions", "./TypeChecking"], function (require, exports, Exceptions, TypeChecking) {
    var ArgumentException = Exceptions.ArgumentException;
    var checkReal = TypeChecking.checkReal;
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
