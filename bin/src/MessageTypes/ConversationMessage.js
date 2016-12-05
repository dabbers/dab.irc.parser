"use strict";
const Core = require('dab.irc.core/src');
class ConversationMessage extends Core.Message {
    constructor(msg, server) {
        super(msg);
        this._destination = null;
        this._wall = "";
        this._ctcp = false;
        if (msg.command != "PRIVMSG" && msg.command != "NOTICE")
            throw new Error("Invalid message to parse, " + msg.command);
        let dest = msg.tokenized[2];
        while (server.attributes["STATUSMSG"] && server.attributes["STATUSMSG"].indexOf(dest[0]) != -1) {
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
            var last = this.tokenized.length - 1;
            var last_tok = this.tokenized[last];
            this._tokenized[last] = last_tok.substr(0, last_tok.length - 1);
            this._message = this.tokenized.slice(4).join(" ");
            this._firstWord = this.tokenized[4];
            this._tokenized[4] = ":" + this.tokenized[4];
            this._tokenized.splice(3, 1);
        }
        if (this.messageTags["intent"]) {
            this._ctcp = true;
        }
    }
    get destination() {
        return this._destination;
    }
    get wall() {
        return this._wall;
    }
    get ctcp() {
        return this._ctcp;
    }
    toString() {
        return "[ConversationMessage " + this.from.display + " to " + this.destination.display + "]";
    }
    updateDestinationReference(dest) {
        this._destination = dest;
    }
}
exports.ConversationMessage = ConversationMessage;
//# sourceMappingURL=ConversationMessage.js.map