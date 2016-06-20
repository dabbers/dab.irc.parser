"use strict";
var DynamicParser_1 = require('../DynamicParser');
var Ping = (function () {
    function Ping() {
    }
    Ping.prototype.parse = function (server, message, callback) {
        callback(server, message);
        return true;
    };
    Ping.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["PING"] = this;
            return;
        }
        throw "Invalid context passed to PRIVMSG parser";
    };
    Ping.prototype.resume = function (state) {
    };
    Ping.prototype.uninit = function () {
        return null;
    };
    return Ping;
}());
exports.Ping = Ping;
