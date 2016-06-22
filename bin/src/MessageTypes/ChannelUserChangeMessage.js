"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var ChannelUserChangeMessage = (function (_super) {
    __extends(ChannelUserChangeMessage, _super);
    function ChannelUserChangeMessage(msg) {
        _super.call(this, msg.raw);
        this._destination = null;
        this._destination = new Core.Channel(msg.tokenized[2]);
    }
    Object.defineProperty(ChannelUserChangeMessage.prototype, "destination", {
        get: function () {
            return this._destination;
        },
        enumerable: true,
        configurable: true
    });
    return ChannelUserChangeMessage;
}(Core.Message));
exports.ChannelUserChangeMessage = ChannelUserChangeMessage;
