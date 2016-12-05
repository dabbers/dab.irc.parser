"use strict";
const basicTests = require('./Tests/basicTests');
const functionalTests = require('./Tests/functionalTests');
const tsUnit = require('tsunit.external/tsUnit');
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
//# sourceMappingURL=index.js.map