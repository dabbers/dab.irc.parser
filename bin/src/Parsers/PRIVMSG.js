"use strict";
var ConversationMessage_1 = require('../MessageTypes/ConversationMessage');
var DynamicParser_1 = require('../DynamicParser');
var EventList_1 = require('../EventList');
var Privmsg = (function () {
    function Privmsg() {
    }
    Privmsg.prototype.parse = function (server, message, callback) {
        callback(server, new ConversationMessage_1.ConversationMessage(message, server));
        return true;
    };
    Privmsg.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.PRIVMSG] = this;
            this.ctx.parserDictionary[EventList_1.Events.NOTICE] = this;
            return;
        }
        throw new Error("Invalid context passed to NOTICE/PRIVMSG parser");
    };
    Privmsg.prototype.resume = function (state) {
        throw new Error("Don't resume a parser. Please call init");
    };
    Privmsg.prototype.uninit = function () {
        delete this.ctx.parserDictionary[EventList_1.Events.PRIVMSG];
        delete this.ctx.parserDictionary[EventList_1.Events.NOTICE];
        return null;
    };
    return Privmsg;
}());
exports.Privmsg = Privmsg;
