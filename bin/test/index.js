"use strict";
var basicTests = require('./Tests/basicTests');
var tsUnit = require('tsunit.external/tsUnit');
var test = new tsUnit.Test(basicTests).run();
if (test.errors.length > 0) {
    console.log("TEST ERRORS\r\n");
    console.log(test.errors);
}
else {
    console.log("TEST PASSED\r\n");
}
