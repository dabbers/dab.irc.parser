import * as basicTests from './Tests/basicTests';
import tsUnit = require('tsunit.external/tsUnit');

// "The One Liner" - you can do this in multiple stages too
var test = new tsUnit.Test(basicTests).run();


if (test.errors.length > 0) {
    console.log("TEST ERRORS\r\n");
    console.log(test.errors);
}
else {
    console.log("TEST PASSED\r\n");
}