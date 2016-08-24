"use strict";
var Core = require('dab.irc.core/src');
var DynamicParser_1 = require('../DynamicParser');
var TestParser = (function () {
    function TestParser() {
    }
    TestParser.prototype.parse = function (server, message, callback) {
        callback(server, new Core.Message(":test.server.tld TEST AUTH :This is a test message"));
        return true;
    };
    TestParser.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary["TEST"] = this;
            return;
        }
    };
    TestParser.prototype.resume = function (state) {
    };
    TestParser.prototype.uninit = function () {
        delete this.ctx.parserDictionary["TEST"];
        return null;
    };
    return TestParser;
}());
exports.TestParser = TestParser;
