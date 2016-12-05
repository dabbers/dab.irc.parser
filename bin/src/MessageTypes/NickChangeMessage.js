"use strict";
const Core = require('dab.irc.core/src');
class NickChangeMessage extends Core.Message {
    constructor(msg) {
        super(msg);
        if (msg.command != "NICK")
            throw new Error("Invalid message to parse, " + msg.command);
        this._to = new Core.User((this._tokenized[2][0] == ':' ? this._tokenized[2].substr(1) : this._tokenized[2]), null, null);
    }
    get destination() {
        return this._to;
    }
    toString() {
        return "[NickChangeMessage " + this.from.display + " to " + this._to.nick + "]";
    }
    updateDestinationReference(dest) {
        this._to = dest;
    }
}
exports.NickChangeMessage = NickChangeMessage;
//# sourceMappingURL=NickChangeMessage.js.map