"use strict";
var ChannelUserChangeMessage_1 = require('../MessageTypes/ChannelUserChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var Part = (function () {
    function Part() {
    }
    Part.prototype.parse = function (server, message, callback) {
        callback(server, new ChannelUserChangeMessage_1.ChannelUserChangeMessage(message));
        return true;
    };
    Part.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["PART"] = this;
            return;
        }
        throw "Invalid context passed to PART parser";
    };
    Part.prototype.resume = function (state) {
    };
    Part.prototype.uninit = function () {
        return null;
    };
    return Part;
}());
exports.Part = Part;
