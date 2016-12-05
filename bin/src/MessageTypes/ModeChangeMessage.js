"use strict";
const Core = require('dab.irc.core/src');
class ModeChangeMessage extends Core.Message {
    constructor(msg, server) {
        super(msg);
        this._modes = [];
        if (msg.command != "MODE")
            throw new Error("Invalid message to parse, " + msg.command);
        if (!server.attributes["CHANMODES_A"] || !server.attributes["CHANMODES_B"] || !server.attributes["CHANMODES_C"])
            throw new Error("CHANMODES_* haven't been setup yet. Is this expected?");
        if (!server.attributes["PREFIX_PREFIXES"] || !server.attributes["PREFIX_MODES"])
            throw new Error("PREFIX_* haven't been setup yet. Is this expected?");
        let modesstring = msg.tokenized[3];
        let paramsindex = 4;
        let adding = true;
        let isChannel = server.isChannel(msg.tokenized[2]);
        let prefixz = server.attributes["PREFIX_PREFIXES"];
        let start = modesstring[0] == ':' ? 1 : 0;
        this._target = (isChannel ? new Core.Channel(msg.tokenized[2]) : new Core.User(msg.tokenized[2], null, null));
        for (let i = start; i < modesstring.length; i++) {
            if (modesstring[i] == '+') {
                adding = true;
                continue;
            }
            else if (modesstring[i] == '-') {
                adding = false;
                continue;
            }
            let mode = new Core.Mode();
            mode.character = modesstring[i];
            mode.change = adding ? Core.ModeChangeType.Adding : Core.ModeChangeType.Removing;
            if (server.attributes["CHANMODES_A"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_B"].indexOf(modesstring[i].toString()) > -1 ||
                server.attributes["CHANMODES_C"].indexOf(modesstring[i].toString()) > -1) {
                mode.type = Core.ModeType.Channel;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            else if (isChannel && server.attributes["PREFIX_MODES"].indexOf(modesstring[i].toString()) != -1) {
                mode.type = Core.ModeType.ChannelUser;
                mode.argument = msg.tokenized[paramsindex];
                paramsindex++;
            }
            else if (!isChannel) {
                mode.type = Core.ModeType.UMode;
            }
            mode.destination = this._target;
            this._modes.push(mode);
        }
    }
    get modes() {
        return this._modes;
    }
    get destination() {
        return this._target;
    }
    toString() {
        return "[ModeChangeMessage " + this._target.display + "]";
    }
    updateDestinationReference(dest) {
        this._target = dest;
    }
}
exports.ModeChangeMessage = ModeChangeMessage;
//# sourceMappingURL=ModeChangeMessage.js.map