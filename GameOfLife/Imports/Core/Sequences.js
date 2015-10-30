define(["require", "exports", "./TypeChecks"], function (require, exports, TypeChecks) {
    var checkDefinedAndNotNull = TypeChecks.checkDefinedAndNotNull;
    function createNodeSeq(nodes) { return new NodeSeq(nodes); }
    exports.createNodeSeq = createNodeSeq;
    function createArraySeq(array) { return new ArraySeq(array); }
    exports.createArraySeq = createArraySeq;
    // A class that wraps up an array under the Seq interface. Importantly, 
    // we don't extend the prototype, but we *do* use the fast functions of the array.
    var ArraySeq = (function () {
        function ArraySeq(seq) {
            checkDefinedAndNotNull("seq", seq);
            this.seq = seq;
        }
        ArraySeq.prototype.filter = function (condition) {
            checkDefinedAndNotNull("condition", condition);
            return new ArraySeq(this.seq.filter(condition));
        };
        ArraySeq.prototype.map = function (transform) {
            checkDefinedAndNotNull("transform", transform);
            return new ArraySeq(this.seq.map(transform));
        };
        ArraySeq.prototype.reduceRight = function (f, initialValue) {
            checkDefinedAndNotNull("f", f);
            return this.seq.reduceRight(f, initialValue);
        };
        ArraySeq.prototype.toArray = function () {
            return this.seq;
        };
        return ArraySeq;
    })();
    // A class that wraps up a Nodelist under the Seq interface. Importantly, 
    // we don't extend the prototype of Nodelist, and we don't take a costly 
    // detour through an array before the first function is used.
    var NodeSeq = (function () {
        function NodeSeq(seq) {
            checkDefinedAndNotNull("seq", seq);
            this.seq = seq;
        }
        NodeSeq.prototype.filter = function (condition) {
            checkDefinedAndNotNull("condition", condition);
            return new ArraySeq(Array.prototype.filter.call(this.seq, condition));
        };
        NodeSeq.prototype.map = function (transform) {
            checkDefinedAndNotNull("transform", transform);
            return new ArraySeq(Array.prototype.map.call(this.seq, transform));
        };
        NodeSeq.prototype.reduceRight = function (f, initialValue) {
            checkDefinedAndNotNull("f", f);
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
});
