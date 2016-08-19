"use strict";
var DynamicParser_1 = require('../DynamicParser');
var EventList_1 = require('../EventList');
var Do005 = (function () {
    function Do005() {
    }
    Do005.prototype.parse = function (server, message, callback) {
        for (var i = 3; i < message.tokenized.length; i++) {
            var key = "";
            var value = "";
            if (message.tokenized[i].indexOf("=") != -1) {
                var sep = message.tokenized[i].split("=");
                key = sep[0];
                value = sep[1];
            }
            else {
                key = value = message.tokenized[i];
            }
            server.attributes[key] = value;
        }
        if (server.attributes["PREFIX"]) {
            var tosplit = server.attributes["PREFIX"].substring(1);
            var split = tosplit.split(')');
            server.attributes["PREFIX_MODES"] = split[0];
            server.attributes["PREFIX_PREFIXES"] = split[1];
        }
        if (server.attributes["CHANMODES"]) {
            var chanmodes = server.attributes["CHANMODES"].split(',');
            server.attributes["CHANMODES_A"] = chanmodes[0];
            server.attributes["CHANMODES_B"] = chanmodes[1];
            server.attributes["CHANMODES_C"] = chanmodes[2];
            server.attributes["CHANMODES_D"] = chanmodes[3];
        }
        return false;
    };
    Do005.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Numerics.ISUPPORT] = this;
            return;
        }
        throw "Invalid context passed to 005 parser";
    };
    Do005.prototype.resume = function (state) {
        throw "Don't resume a parser. Please call init";
    };
    Do005.prototype.uninit = function () {
        delete this.ctx.parserDictionary["005"];
        return null;
    };
    return Do005;
}());
exports.Do005 = Do005;
