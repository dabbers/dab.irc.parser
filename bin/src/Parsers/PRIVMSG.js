"use strict";
var ConversationMessage_1 = require('../MessageTypes/ConversationMessage');
var DynamicParser_1 = require('../DynamicParser');
var Privmsg = (function () {
    function Privmsg() {
    }
    Privmsg.prototype.parse = function (server, message, callback) {
        callback(server, new ConversationMessage_1.ConversationMessage(message, server));
        return true;
    };
    Privmsg.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["PRIVMSG"] = this;
            ctx.parserDictionary["NOTICE"] = this;
            return;
        }
        throw "Invalid context passed to NOTICE/PRIVMSG parser";
    };
    Privmsg.prototype.resume = function (state) {
    };
    Privmsg.prototype.uninit = function () {
        return null;
    };
    return Privmsg;
}());
exports.Privmsg = Privmsg;
