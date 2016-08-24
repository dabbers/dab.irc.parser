"use strict";
var ChannelUserChangeMessage_1 = require('../MessageTypes/ChannelUserChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var EventList_1 = require('../EventList');
var ChannelUserChange = (function () {
    function ChannelUserChange() {
    }
    ChannelUserChange.prototype.parse = function (server, message, callback) {
        callback(server, new ChannelUserChangeMessage_1.ChannelUserChangeMessage(message));
        return true;
    };
    ChannelUserChange.prototype.init = function (context) {
        if (context instanceof DynamicParser_1.DynamicParser) {
            this.ctx = context;
            this.ctx.parserDictionary[EventList_1.Events.JOIN] = this;
            this.ctx.parserDictionary[EventList_1.Events.PART] = this;
            return;
        }
        throw new Error("Invalid context passed to ChannelUserChange parser");
    };
    ChannelUserChange.prototype.resume = function (state) {
        throw new Error("Don't resume a parser. Please call init");
    };
    ChannelUserChange.prototype.uninit = function () {
        delete this.ctx.parserDictionary[EventList_1.Events.JOIN];
        delete this.ctx.parserDictionary[EventList_1.Events.PART];
        return null;
    };
    return ChannelUserChange;
}());
exports.ChannelUserChange = ChannelUserChange;
