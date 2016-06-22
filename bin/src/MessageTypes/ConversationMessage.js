"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Core = require('dab.irc.core/src');
var ConversationMessage = (function (_super) {
    __extends(ConversationMessage, _super);
    function ConversationMessage(msg, server) {
        _super.call(this, msg.raw);
        this._destination = null;
        this._wall = "";
        this._ctcp = false;
        var dest = msg.tokenized[2];
        while (server.attributes["STATUSMSG"].indexOf(dest[0]) != -1) {
            this._wall += dest[0];
            dest = dest.substr(1);
        }
        if (server.isChannel(dest)) {
            this._destination = new Core.Channel(dest);
        }
        else {
            this._destination = new Core.User(dest, null, null);
        }
        if (this.firstWord[0] == "\x01") {
            this._ctcp = true;
            this._messageTags["intent"] = this._firstWord.substr(1);
            this._firstWord = this.tokenized[4];
            var last = this.tokenized.length - 1;
            var last_tok = this.tokenized[last];
            this._tokenized[last] = last_tok.substr(0, last_tok.length - 1);
            this._message = this.tokenized.slice(4).join(" ");
            this._tokenized[4] = ":" + this.tokenized[4];
            this._tokenized.splice(3, 1);
        }
        if (this.messageTags["intent"]) {
            this._ctcp = true;
        }
    }
    Object.defineProperty(ConversationMessage.prototype, "destination", {
        get: function () {
            return this._destination;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConversationMessage.prototype, "wall", {
        get: function () {
            return this._wall;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConversationMessage.prototype, "ctcp", {
        get: function () {
            return this._ctcp;
        },
        enumerable: true,
        configurable: true
    });
    return ConversationMessage;
}(Core.Message));
exports.ConversationMessage = ConversationMessage;
