"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var PrivmsgMessage = (function (_super) {
    __extends(PrivmsgMessage, _super);
    function PrivmsgMessage(msg, serverAttributes) {
        _super.call(this, msg.raw);
        this.destination = null;
        this.wall = "";
        this.ctcp = false;
        var dest = msg.tokenized[2];
        while (serverAttributes["STATUSMSG"].indexOf(dest[0]) != -1) {
            this.wall += dest[0];
            dest = dest.substr(1);
        }
        if (serverAttributes["CHANTYPES"].indexOf(msg.tokenized[2][0]) != -1) {
            this.destination = new Core.Channel(msg.tokenized[2]);
        }
        else {
            this.destination = new Core.User(msg.tokenized[2], null, null);
        }
        if (this.firstWord[0] == "\u0001") {
            this.ctcp = true;
            this.firstWord = this.firstWord.substr(1);
        }
    }
    return PrivmsgMessage;
}(Core.Message));
exports.PrivmsgMessage = PrivmsgMessage;
