"use strict";
const Core = require('dab.irc.core/src');
class ChannelUserChangeMessage extends Core.Message {
    constructor(msg) {
        super(msg);
        this._destination = null;
        if (msg.command != "JOIN" && msg.command != "PART")
            throw new Error("Invalid message to parse, " + msg.command);
        this._destination = new Core.Channel(msg.tokenized[2]);
    }
    get destination() {
        return this._destination;
    }
    toString() {
        return "[ChannelUserChangeMessage " + this.from.display + " " + this.command + " " + this.destination.display + "]";
    }
    updateDestinationReference(dest) {
        this._destination = dest;
    }
}
exports.ChannelUserChangeMessage = ChannelUserChangeMessage;
//# sourceMappingURL=ChannelUserChangeMessage.js.map