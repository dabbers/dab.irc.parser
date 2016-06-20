"use strict";
var Parsers_1 = require('./Parsers');
var DynamicParser = (function () {
    function DynamicParser() {
        this.parserDictionary = {};
        this.parsers = [];
        this.parsers = Parsers_1.getParsers();
        for (var i in this.parsers) {
            this.parsers[i].init(this);
        }
    }
    DynamicParser.prototype.parse = function (server, message, callback) {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }
        return false;
    };
    DynamicParser.prototype.init = function (context) {
    };
    DynamicParser.prototype.resume = function (state) {
    };
    DynamicParser.prototype.uninit = function () {
        return null;
    };
    return DynamicParser;
}());
exports.DynamicParser = DynamicParser;
