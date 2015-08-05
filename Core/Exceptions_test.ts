/* tslint:disable no-unused-variable*/
import Exceptions = require("Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

let testClass: string;
let method: string;
let name = (testCase: string) => testClass + ", " + method + ": " + testCase;

testClass = "ArgumentException";


method = "constructor";

// no point in testing that the constructors argument is not checked


method = "getArgumentName";

test(name("result"), () => {
    const e = new ArgumentException("foo");

    strictEqual(e.getArgumentName(), "foo");
});


method = "toString";

test(name("containsArgumentName"), () => {
    const e = new ArgumentException("foo");

    ok(e.toString().indexOf("foo") > -1);
});

test(name("containsArgumentNameWhenNull"), () => {
    const e = new ArgumentException(null);
    ok(e.toString().indexOf("null") > -1);
});

test(name("containsArgumentNameWhenUndefined"), () => {
    const e = new ArgumentException("undefined");
    ok(e.toString().indexOf("undefined") > -1);
});