import {ArgumentException} from "Exceptions";

let testClass: string;
let functionName: string;
let name = (testCase: string) => testClass + ", " + functionName + ": " + testCase;

testClass = "ArgumentException";


functionName = "constructor";

// no point in testing that the constructors argument is not checked


functionName = "getArgumentName";

test(name("result"), () => {
    const e = new ArgumentException("foo");

    strictEqual(e.getArgumentName(), "foo");
});


functionName = "toString";

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