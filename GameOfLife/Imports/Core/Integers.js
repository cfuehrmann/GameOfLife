define(["require", "exports", "./Exceptions"], function (require, exports, Exceptions) {
    var ArgumentException = Exceptions.ArgumentException;
    /* tslint:enable no-unused-variable*/
    function mod(numerator, denominator) {
        if (!isFinite(numerator) || numerator == null) {
            throw new ArgumentException("numerator");
        }
        if (!isFinite(denominator) || denominator == null || denominator === 0) {
            throw new ArgumentException("denominator");
        }
        var ad = Math.abs(denominator);
        return ((numerator % ad) + ad) % ad;
    }
    exports.mod = mod;
    function isNoInt(value) {
        return value % 1 !== 0 || value == null;
    }
    exports.isNoInt = isNoInt;
});
