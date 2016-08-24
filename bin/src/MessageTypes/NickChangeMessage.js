"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var NickChangeMessage = (function (_super) {
    __extends(NickChangeMessage, _super);
    function NickChangeMessage(msg) {
        _super.call(this, msg);
        if (msg.command != "NICK")
            throw new Error("Invalid message to parse, " + msg.command);
        this._to = new Core.User((this._tokenized[2][0] == ':' ? this._tokenized[2].substr(1) : this._tokenized[2]), null, null);
    }
    Object.defineProperty(NickChangeMessage.prototype, "destination", {
        get: function () {
            return this._to;
        },
        enumerable: true,
        configurable: true
    });
    return NickChangeMessage;
}(Core.Message));
exports.NickChangeMessage = NickChangeMessage;
