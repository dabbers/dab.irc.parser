"use strict";
var path = require('path');
var DynamicParser = (function () {
    function DynamicParser() {
        this.parserDictionary = {};
        this.parsers = {};
    }
    DynamicParser.prototype.parse = function (server, message, callback) {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }
        return false;
    };
    DynamicParser.prototype.load = function (name) {
        name = name.replace(".js", "").replace(".", "");
        var fullPath = path.join(__dirname, "Parsers", name);
        if (require.cache[fullPath + ".js"])
            delete require.cache[fullPath + ".js"];
        if (this.parsers[name])
            this.unload(name, false);
        var obj = require(fullPath);
        var indx = Object.keys(obj)[0];
        var fnc = obj[indx];
        if (!fnc)
            throw new Error("Could not load module (e1): " + name);
        var inst = new fnc();
        if (!inst.init)
            throw new Error("Could not load module (e2): " + name);
        inst.init(this);
        this.parsers[name] = inst;
        return this;
    };
    DynamicParser.prototype.unload = function (name, persist) {
        if (this.parsers[name]) {
            this.parsers[name].uninit();
            delete this.parsers[name];
        }
        return this;
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
