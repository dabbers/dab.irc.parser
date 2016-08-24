"use strict";
var NickChangeMessage_1 = require('../MessageTypes/NickChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var EventList_1 = require('../EventList');
var NickChange = (function () {
    function NickChange() {
    }
    NickChange.prototype.parse = function (server, message, callback) {
        callback(server, new NickChangeMessage_1.NickChangeMessage(message));
        return true;
    };
    NickChange.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.NICK] = this;
            return;
        }
        throw new Error("Invalid context passed to PRIVMSG parser");
    };
    NickChange.prototype.resume = function (state) {
        throw new Error("Don't resume a parser. Please call init");
    };
    NickChange.prototype.uninit = function () {
        delete this.ctx.parserDictionary[EventList_1.Events.MODE];
        return null;
    };
    return NickChange;
}());
exports.NickChange = NickChange;
