"use strict";
var ModeChangeMessage_1 = require('../MessageTypes/ModeChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
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
        if (context.constructor == DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary["MODE"] = this;
            return;
        }
        throw "Invalid context passed to PRIVMSG parser";
    };
    Privmsg.prototype.resume = function (state) {
    };
    Privmsg.prototype.uninit = function () {
        delete this.ctx.parserDictionary["MODE"];
        return null;
    };
    return Privmsg;
}());
exports.Privmsg = Privmsg;
