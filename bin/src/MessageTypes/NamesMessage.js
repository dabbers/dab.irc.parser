"use strict";
const Core = require('dab.irc.core/src');
(function (ChannelStatus) {
    ChannelStatus[ChannelStatus["Secret"] = 0] = "Secret";
    ChannelStatus[ChannelStatus["Private"] = 1] = "Private";
    ChannelStatus[ChannelStatus["Public"] = 2] = "Public";
})(exports.ChannelStatus || (exports.ChannelStatus = {}));
var ChannelStatus = exports.ChannelStatus;
class NamesMessage extends Core.Message {
    constructor(msg, server) {
        super(msg);
        this._destination = null;
        this._users = [];
        let prefixes = server.attributes["PREFIX_PREFIXES"];
        this._destination = new Core.Channel(this.tokenized[4]);
        switch (this.tokenized[3]) {
            case '@':
                this._status = ChannelStatus.Secret;
                break;
            case '*':
                this._status = ChannelStatus.Private;
                break;
            case '=':
            default:
                this._status = ChannelStatus.Public;
                break;
        }
        let restore = this.tokenized[5][0] == ':' ? true : false;
        if (restore)
            this.tokenized[5] = this.tokenized[5].substr(1);
        for (let i = 5; i < this.tokenized.length; i++) {
            if (!this.tokenized[i])
                throw new Error("Why is this item empty?");
            let user;
            let entry = this.tokenized[i];
            let identIndx = entry.indexOf("!");
            if (identIndx != -1) {
                let nick = entry.substring(0, identIndx);
                let rest = entry.substr(identIndx + 1);
                let hostIndx = rest.indexOf("@");
                let ident = rest.substring(0, hostIndx);
                let host = rest.substr(hostIndx + 1);
                user = new Core.User(nick, ident, host);
            }
            else {
                user = new Core.User(entry, null, null);
            }
            while (prefixes.indexOf(user.nick[0].toString()) != -1) {
                let mode = new Core.Mode();
                mode.character = user.nick[0].toString();
                mode.argument = user.nick;
                mode.destination = this.destination;
                mode.change = Core.ModeChangeType.Adding;
                mode.type = Core.ModeType.ChannelUser;
                user.modes.push(mode);
                user.nick = user.nick.substring(1);
            }
            if (user.modes) {
                user.modes.sort(function (s1, s2) {
                    return prefixes.indexOf(s1.character) - prefixes.indexOf(s2.character);
                });
            }
            this._users.push(user);
        }
        if (restore)
            this.tokenized[5] = ":" + this.tokenized[5];
    }
    get destination() {
        return this._destination;
    }
    get status() {
        return this._status;
    }
    get users() {
        return this._users;
    }
    toString() {
        return "[NamesMessage " + this.destination.display + "]";
    }
    updateDestinationReference(dest) {
        this._destination = dest;
    }
}
exports.NamesMessage = NamesMessage;
//# sourceMappingURL=NamesMessage.js.map