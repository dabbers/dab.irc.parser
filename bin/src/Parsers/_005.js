"use strict";
var DynamicParser_1 = require('../DynamicParser');
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
            var tosplit = value.substring(1);
            var split = tosplit.split(')');
            server.attributes["PREFIX_MODES"] = split[0];
            server.attributes["PREFIX_PREFIXES"] = split[1];
        }
        if (server.attributes["CHANMODES"]) {
            var chanmodes = value.split(',');
            server.attributes["CHANMODES_A"] = chanmodes[0];
            server.attributes["CHANMODES_B"] = chanmodes[1];
            server.attributes["CHANMODES_C"] = chanmodes[2];
            server.attributes["CHANMODES_D"] = chanmodes[3];
        }
        return false;
    };
    Do005.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["005"] = this;
            return;
        }
        throw "Invalid context passed to 005 parser";
    };
    Do005.prototype.resume = function (state) {
    };
    Do005.prototype.uninit = function () {
        return null;
    };
    return Do005;
}());
exports.Do005 = Do005;
