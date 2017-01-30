import {ArgumentException} from "Exceptions";

let testClass: string;
let functionName: string;
let name = (testCase: string) => testClass + ", " + functionName + ": " + testCase;

testClass = "ArgumentException";


functionName = "constructor";

// no point in testing that the constructors argument is not checked


functionName = "getArgumentName";

QUnit.test(name("result"), assert => {
    const e = new ArgumentException("foo");

    assert.strictEqual(e.getArgumentName(), "foo");
});


functionName = "toString";

QUnit.test(name("containsArgumentName"), assert => {
    const e = new ArgumentException("foo");

    assert.ok(e.toString().indexOf("foo") > -1);
});

QUnit.test(name("containsArgumentNameWhenUndefined"), assert => {
    const e = new ArgumentException("undefined");
    assert.ok(e.toString().indexOf("undefined") > -1);
});