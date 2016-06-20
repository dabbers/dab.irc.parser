"use strict";
var PrivmsgMessage_1 = require('../MessageTypes/PrivmsgMessage');
var DynamicParser_1 = require('../DynamicParser');
var Privmsg = (function () {
    function Privmsg() {
    }
    Privmsg.prototype.parse = function (server, message, callback) {
        callback(server, new PrivmsgMessage_1.PrivmsgMessage(message, server.attributes));
        return true;
    };
    Privmsg.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["PRIVMSG"] = this;
            return;
        }
        throw "Invalid context passed to PRIVMSG parser";
    };
    Privmsg.prototype.resume = function (state) {
    };
    Privmsg.prototype.uninit = function () {
        return null;
    };
    return Privmsg;
}());
exports.Privmsg = Privmsg;
