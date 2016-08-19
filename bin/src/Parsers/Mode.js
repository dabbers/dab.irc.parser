"use strict";
var ModeChangeMessage_1 = require('../MessageTypes/ModeChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var EventList_1 = require('../EventList');
var Privmsg = (function () {
    function Privmsg() {
    }
    Privmsg.prototype.parse = function (server, message, callback) {
        var attr = server.attributes;
        if (!attr["CHANTYPES"]) {
            attr["CHANTYPES"] = "#&";
        }
        callback(server, new ModeChangeMessage_1.ModeChangeMessage(message, server));
        return true;
    };
    Privmsg.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.MODE] = this;
            return;
        }
        throw "Invalid context passed to PRIVMSG parser";
    };
    Privmsg.prototype.resume = function (state) {
        throw "Don't resume a parser. Please call init";
    };
    Privmsg.prototype.uninit = function () {
        delete this.ctx.parserDictionary["MODE"];
        return null;
    };
    return Privmsg;
}());
exports.Privmsg = Privmsg;
