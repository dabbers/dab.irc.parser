"use strict";
var basicTests = require('./Tests/basicTests');
var functionalTests = require('./Tests/functionalTests');
var tsUnit = require('tsunit.external/tsUnit');
var test = new tsUnit.Test(basicTests).run();
var test2 = new tsUnit.Test(functionalTests).run();
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
