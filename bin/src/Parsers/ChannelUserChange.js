"use strict";
var ChannelUserChangeMessage_1 = require('../MessageTypes/ChannelUserChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var ChannelUserChange = (function () {
    function ChannelUserChange() {
    }
    ChannelUserChange.prototype.parse = function (server, message, callback) {
        callback(server, new ChannelUserChangeMessage_1.ChannelUserChangeMessage(message));
        return true;
    };
    ChannelUserChange.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary["JOIN"] = this;
            this.ctx.parserDictionary["PART"] = this;
            return;
        }
        throw "Invalid context passed to ChannelUserChange parser";
    };
    ChannelUserChange.prototype.resume = function (state) {
    };
    ChannelUserChange.prototype.uninit = function () {
        delete this.ctx.parserDictionary["JOIN"];
        delete this.ctx.parserDictionary["PART"];
        return null;
    };
    return ChannelUserChange;
}());
exports.ChannelUserChange = ChannelUserChange;
