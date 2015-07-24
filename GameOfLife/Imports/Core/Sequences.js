define(["require", "exports", "./TypeChecking"], function (require, exports, TypeChecking) {
    var assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
    // A class that wraps up an array under the Seq interface. Importantly, 
    // we don't extend the prototype, but we *do* use the fast methods of the array.
    var ArraySeq = (function () {
        function ArraySeq(seq) {
            assertDefinedAndNotNull("seq", seq);
            this.seq = seq;
        }
        ArraySeq.prototype.filter = function (condition) {
            assertDefinedAndNotNull("condition", condition);
            return new ArraySeq(this.seq.filter(condition));
        };
        ArraySeq.prototype.map = function (transform) {
            assertDefinedAndNotNull("transform", transform);
            return new ArraySeq(this.seq.map(transform));
        };
        ArraySeq.prototype.reduceRight = function (f, initialValue) {
            assertDefinedAndNotNull("f", f);
            return this.seq.reduceRight(f, initialValue);
        };
        ArraySeq.prototype.toArray = function () {
            return this.seq;
        };
        return ArraySeq;
    })();
    exports.ArraySeq = ArraySeq;
    // A class that wraps up a Nodelist under the Seq interface. Importantly, 
    // we don't extend the prototype of Nodelist, and we don't take a costly 
    // detour through an array before the first method is used.
    var NodeSeq = (function () {
        function NodeSeq(seq) {
            assertDefinedAndNotNull("seq", seq);
            this.seq = seq;
        }
        NodeSeq.prototype.filter = function (condition) {
            assertDefinedAndNotNull("condition", condition);
            return new ArraySeq(Array.prototype.filter.call(this.seq, condition));
        };
        NodeSeq.prototype.map = function (transform) {
            assertDefinedAndNotNull("transform", transform);
            return new ArraySeq(Array.prototype.map.call(this.seq, transform));
        };
        NodeSeq.prototype.reduceRight = function (f, initialValue) {
            assertDefinedAndNotNull("f", f);
            return Array.prototype.reduceRight.call(this.seq, f, initialValue);
        };
        NodeSeq.prototype.toArray = function () {
            var result = new Array();
            for (var i = 0; i < this.seq.length; i++) {
                result.push(this.seq[i]);
            }
            return result;
        };
        return NodeSeq;
    })();
    exports.NodeSeq = NodeSeq;
});
