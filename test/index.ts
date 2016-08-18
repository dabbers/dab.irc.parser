import * as basicTests from './Tests/basicTests';
import * as functionalTests from './Tests/functionalTests';
import tsUnit = require('tsunit.external/tsUnit');

// "The One Liner" - you can do this in multiple stages too
let test = new tsUnit.Test(basicTests).run();
let test2 = new tsUnit.Test(functionalTests).run();


if (test.errors.length > 0) {
    console.log("basicTests ERRORS\r\n");
    console.log(test.errors);
}
else {
    console.log("basicTests PASSED\r\n");
}

if (test2.errors.length > 0) {
    console.log("functionalTests ERRORS\r\n");
    console.log(test2.errors);
}
else {
    console.log("functionalTests PASSED\r\n");
}