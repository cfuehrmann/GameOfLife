import gt = require("./app");
import Foo = gt.Foo;

var el = document.getElementById('content');
el.innerHTML = "Blah";
var x = new Foo();
x.Do(el);
